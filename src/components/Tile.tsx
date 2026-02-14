import { LetterState } from "../words";

const STATE_LABELS: Record<string, string> = {
  correct: "correct",
  present: "present in word",
  absent: "not in word",
};

interface TileProps {
  letter: string;
  state: LetterState;
  reveal: boolean;
  delay: number;
}

export default function Tile({ letter, state, reveal, delay }: TileProps) {
  const className = [
    "tile",
    letter ? "filled" : "",
    state !== "empty" && reveal ? state : "",
    reveal ? "reveal" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const revealed = state !== "empty" && reveal;
  let ariaLabel: string;
  if (!letter) {
    ariaLabel = "empty";
  } else if (revealed) {
    ariaLabel = `${letter}, ${STATE_LABELS[state]}`;
  } else {
    ariaLabel = letter;
  }

  return (
    <div
      className={className}
      part="tile"
      role="img"
      aria-label={ariaLabel}
      style={reveal ? { animationDelay: `${delay}ms` } : undefined}
    >
      {letter}
    </div>
  );
}
