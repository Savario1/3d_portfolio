import { useState } from "react";

export default function ContactPortrait({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="portrait-frame portrait-frame--placeholder">
        <div className="portrait-frame__inner">
          <svg
            className="portrait-frame__placeholder-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M4.5 20c1.6-3.6 4.6-5.5 7.5-5.5s5.9 1.9 7.5 5.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <p className="portrait-frame__placeholder-text">
            Add <code>contact-portrait.jpg</code> to <code>/public</code> to display the photograph
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="portrait-frame">
      <div className="portrait-frame__inner">
        <img
          className="portrait-frame__image"
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
