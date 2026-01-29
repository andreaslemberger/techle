import { useState, useEffect, useCallback } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Toast from "./components/Toast";
import {
  pickRandomWord,
  isValidGuess,
  evaluateGuess,
  LetterState,
} from "./words";
import styles from "./styles.css?inline";

interface Guess {
  word: string;
  states: LetterState[];
}

const MAX_GUESSES = 6;

export default function TechWordle() {
  const [solution, setSolution] = useState(() => pickRandomWord());
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(
    () => new Map()
  );

  const wordLength = solution.length;

  const showToast = useCallback((msg: string, duration = 3000) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }, []);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== wordLength) {
      showToast("Not enough letters");
      return;
    }

    if (!isValidGuess(currentGuess)) {
      showToast("Not a valid word");
      return;
    }

    const states = evaluateGuess(currentGuess, solution);
    const newGuess: Guess = { word: currentGuess, states };

    setGuesses((prev) => [...prev, newGuess]);
    setCurrentGuess("");

    // Update keyboard letter states
    setLetterStates((prev) => {
      const next = new Map(prev);
      for (let i = 0; i < currentGuess.length; i++) {
        const letter = currentGuess[i];
        const newState = states[i];
        const existing = next.get(letter);

        // Priority: correct > present > absent
        if (
          !existing ||
          newState === "correct" ||
          (newState === "present" && existing !== "correct")
        ) {
          next.set(letter, newState);
        }
      }
      return next;
    });

    if (currentGuess === solution) {
      setGameOver(true);
      showToast("Congratulations!");
    } else if (guesses.length + 1 >= MAX_GUESSES) {
      setGameOver(true);
      showToast(
        `Better luck next time! The word was ${solution.toUpperCase()}`,
        5000
      );
    }
  }, [currentGuess, wordLength, solution, guesses.length, showToast]);

  const handleKey = useCallback(
    (key: string) => {
      if (gameOver) return;

      if (key === "Enter") {
        submitGuess();
        return;
      }

      if (key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[a-z]$/.test(key) && currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [gameOver, currentGuess.length, wordLength, submitGuess]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") {
        handleKey("Enter");
      } else if (e.key === "Backspace") {
        handleKey("Backspace");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  const resetGame = useCallback(() => {
    setSolution(pickRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setToast(null);
    setLetterStates(new Map());
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="game-container">
        <div className="game-header">
          <h1>Techle</h1>
        </div>
        <Toast message={toast} />
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          wordLength={wordLength}
          maxGuesses={MAX_GUESSES}
        />
        <Keyboard letterStates={letterStates} onKey={handleKey} />
        {gameOver && (
          <button
            onClick={resetGame}
            style={{
              marginTop: 16,
              padding: "12px 24px",
              fontSize: "1rem",
              fontWeight: 700,
              border: "none",
              borderRadius: 4,
              background: "var(--techle-correct-color)",
              color: "var(--techle-text-color)",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        )}
      </div>
    </>
  );
}
