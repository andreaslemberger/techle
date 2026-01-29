import Tile from "./Tile";
import { LetterState } from "../words";

interface RowProps {
  guess: string;
  wordLength: number;
  states: LetterState[];
  isRevealed: boolean;
}

export default function Row({ guess, wordLength, states, isRevealed }: RowProps) {
  const tiles = [];
  for (let i = 0; i < wordLength; i++) {
    tiles.push(
      <Tile
        key={i}
        letter={guess[i] || ""}
        state={states[i] || "empty"}
        reveal={isRevealed && states[i] !== "empty"}
        delay={i * 300}
      />
    );
  }

  return <div className="row">{tiles}</div>;
}
