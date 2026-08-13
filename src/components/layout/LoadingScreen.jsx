export default function LoadingScreen({ progress, isReady }) {
  return (
    <div className="loading-screen" data-hidden={isReady} aria-hidden={isReady}>
      <div className="loading-screen__core" role="status" aria-live="polite">
        <span className="visually-hidden">Loading experience, {Math.round(progress)}%</span>
      </div>
      <p className="loading-screen__label">Booting the network…</p>
      <div className="loading-screen__bar">
        <div
          className="loading-screen__bar-fill"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
}
