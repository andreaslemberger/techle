import { LetterState } from "../words";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

interface KeyboardProps {
  letterStates: Map<string, LetterState>;
  onKey: (key: string) => void;
}

export default function Keyboard({ letterStates, onKey }: KeyboardProps) {
  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => {
            const state = letterStates.get(key) || "";
            const isWide = key === "Enter" || key === "Backspace";
            const display = key === "Backspace" ? "⌫" : key;
            return (
              <button
                key={key}
                className={`key ${state} ${isWide ? "wide" : ""}`}
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
