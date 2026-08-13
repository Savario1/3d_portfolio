import { useCallback, useEffect, useRef, useState } from "react";

const DRONE_FREQUENCIES = [55, 82.5, 110.5];
const TARGET_VOLUME = 0.05;

/**
 * A small, entirely procedural ambient pad — no audio files, so nothing to license.
 * The AudioContext is only created on the first explicit user gesture (the mute
 * toggle itself), which also satisfies browser autoplay-policy requirements.
 */
export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const graphRef = useRef(null);

  const buildGraph = useCallback(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(masterGain);

    const oscillators = DRONE_FREQUENCIES.map((freq, index) => {
      const osc = ctx.createOscillator();
      osc.type = index === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;

      const oscGain = ctx.createGain();
      oscGain.gain.value = index === 0 ? 0.6 : 0.28;

      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + index * 0.02;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 60 + index * 30;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start();
      lfo.start();

      return { osc, lfo };
    });

    const sweep = ctx.createOscillator();
    sweep.frequency.value = 0.03;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 350;
    sweep.connect(sweepGain);
    sweepGain.connect(filter.frequency);
    sweep.start();

    return { ctx, masterGain, oscillators, sweep };
  }, []);

  const stop = useCallback(() => {
    const graph = graphRef.current;
    if (!graph) return;
    const now = graph.ctx.currentTime;
    graph.masterGain.gain.linearRampToValueAtTime(0, now + 0.6);
    setTimeout(() => {
      graph.oscillators.forEach(({ osc, lfo }) => {
        osc.stop();
        lfo.stop();
      });
      graph.sweep.stop();
      graph.ctx.close();
    }, 700);
    graphRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((wasPlaying) => {
      if (wasPlaying) {
        stop();
        return false;
      }

      if (!graphRef.current) {
        graphRef.current = buildGraph();
      }
      const graph = graphRef.current;
      if (!graph) return false;

      if (graph.ctx.state === "suspended") {
        graph.ctx.resume();
      }
      const now = graph.ctx.currentTime;
      graph.masterGain.gain.cancelScheduledValues(now);
      graph.masterGain.gain.linearRampToValueAtTime(TARGET_VOLUME, now + 1.2);
      return true;
    });
  }, [buildGraph, stop]);

  useEffect(() => {
    return () => {
      if (graphRef.current) stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isPlaying, toggle };
}
