import SoundToggle from "../ui/SoundToggle";

export default function TopBar({ name, onOpenQuickView, isAudioPlaying, onToggleAudio }) {
  return (
    <header className="top-bar">
      <a className="top-bar__brand" href="#hero">
        {name}
      </a>
      <div className="top-bar__actions">
        <button type="button" className="btn btn--secondary btn--small" onClick={onOpenQuickView}>
          Quick View
        </button>
        <SoundToggle isPlaying={isAudioPlaying} onToggle={onToggleAudio} />
      </div>
    </header>
  );
}
