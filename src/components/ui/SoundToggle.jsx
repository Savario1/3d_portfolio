export default function SoundToggle({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      onClick={onToggle}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
          <path d="M16 9l4.5 6M20.5 9L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
