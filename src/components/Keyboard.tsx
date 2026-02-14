import { LetterState } from "../words";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const STATE_LABELS: Record<string, string> = {
  correct: "correct",
  present: "present in word",
  absent: "not in word",
};

interface KeyboardProps {
  letterStates: Map<string, LetterState>;
  onKey: (key: string) => void;
}

export default function Keyboard({ letterStates, onKey }: KeyboardProps) {
  return (
    <div className="keyboard" part="keyboard" role="group" aria-label="Keyboard">
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => {
            const state = letterStates.get(key) || "";
            const isWide = key === "Enter" || key === "Backspace";
            const display = key === "Backspace" ? "⌫" : key;
            const stateLabel =
              state && STATE_LABELS[state] ? `${key}, ${STATE_LABELS[state]}` : undefined;
            const keyAriaLabel = key === "Backspace" ? "Backspace" : stateLabel;
            return (
              <button
                key={key}
                className={`key ${state} ${isWide ? "wide" : ""}`}
                part="key"
                aria-label={keyAriaLabel}
                onClick={() => onKey(key)}
              >
                {display}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
