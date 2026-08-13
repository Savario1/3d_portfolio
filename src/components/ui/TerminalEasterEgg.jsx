import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../config/site";
import { about, skills, education } from "../../config/content";
import { projects } from "../../config/projects";

const HELP_TEXT = "Available commands: about, skills, projects, education, contact, help, clear";

function runCommand(rawInput) {
  const command = rawInput.trim().toLowerCase();

  switch (command) {
    case "help":
      return HELP_TEXT;
    case "about":
      return about.paragraphs.join("\n\n");
    case "skills":
      return skills.groups.map((group) => `${group.label}: ${group.items.join(", ")}`).join("\n");
    case "projects":
      return projects.map((project) => `${project.title} — ${project.status}`).join("\n");
    case "education":
      return education.items.map((item) => `${item.credential} — ${item.status}`).join("\n");
    case "contact":
      return `Reach out any time: ${siteConfig.person.email}`;
    case "":
      return "";
    default:
      return `command not found: ${command}. Type "help" for a list of commands.`;
  }
}

export default function TerminalEasterEgg({ onClose }) {
  const [history, setHistory] = useState([
    { type: "output", text: 'Welcome. Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input;

    if (command.trim().toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = runCommand(command);
    setHistory((prev) => [
      ...prev,
      { type: "cmd", text: command },
      ...(output ? [{ type: "output", text: output }] : []),
    ]);
    setInput("");
  };

  return (
    <div className="terminal-panel" role="dialog" aria-label="Terminal easter egg">
      <div className="terminal-panel__header">
        <span className="terminal-panel__header-dot" />
        <span className="terminal-panel__header-dot" />
        <span className="terminal-panel__header-dot" />
        <span className="terminal-panel__title">guest@savario — terminal</span>
        <button
          type="button"
          className="icon-btn terminal-panel__close"
          onClick={onClose}
          aria-label="Close terminal"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="terminal-panel__log" role="log" aria-live="polite" ref={logRef}>
        {history.map((entry, index) => (
          <div
            key={index}
            className={entry.type === "cmd" ? "terminal-panel__log-line--cmd" : undefined}
          >
            {entry.text}
          </div>
        ))}
      </div>
      <form className="terminal-panel__form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="terminal-input">
          Terminal command input
        </label>
        <span className="terminal-panel__prompt" aria-hidden="true">
          $
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          className="terminal-panel__input"
          type="text"
          autoComplete="off"
          spellCheck="false"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </div>
  );
}
