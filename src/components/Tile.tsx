import { LetterState } from "../words";

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

  return (
    <div
      className={className}
      part="tile"
      style={reveal ? { animationDelay: `${delay}ms` } : undefined}
    >
      {letter}
    </div>
  );
}
