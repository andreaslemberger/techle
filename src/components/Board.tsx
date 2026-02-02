import Row from "./Row";
import { LetterState } from "../words";

interface Guess {
  word: string;
  states: LetterState[];
}

interface BoardProps {
  guesses: Guess[];
  currentGuess: string;
  wordLength: number;
  maxGuesses: number;
}

export default function Board({ guesses, currentGuess, wordLength, maxGuesses }: BoardProps) {
  const rows = [];

  for (let i = 0; i < maxGuesses; i++) {
    if (i < guesses.length) {
      rows.push(
        <Row
          key={i}
          guess={guesses[i].word}
          wordLength={wordLength}
          states={guesses[i].states}
          isRevealed={true}
        />,
      );
    } else if (i === guesses.length) {
      rows.push(
        <Row key={i} guess={currentGuess} wordLength={wordLength} states={[]} isRevealed={false} />,
      );
    } else {
      rows.push(<Row key={i} guess="" wordLength={wordLength} states={[]} isRevealed={false} />);
    }
  }

  return <div className="board">{rows}</div>;
}
