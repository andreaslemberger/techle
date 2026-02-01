import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Board from "../components/Board";

describe("Board", () => {
  it("renders the correct number of rows", () => {
    const { container } = render(
      <Board guesses={[]} currentGuess="" wordLength={5} maxGuesses={6} />
    );
    expect(container.querySelectorAll(".row")).toHaveLength(6);
  });

  it("renders submitted guesses with reveal state", () => {
    const guesses = [
      {
        word: "react",
        states: ["correct", "correct", "correct", "correct", "correct"] as const,
      },
    ];
    const { container } = render(
      <Board
        guesses={guesses as any}
        currentGuess=""
        wordLength={5}
        maxGuesses={6}
      />
    );
    const rows = container.querySelectorAll(".row");
    // First row should have revealed tiles
    const firstRowTiles = rows[0].querySelectorAll(".tile");
    expect(firstRowTiles[0]).toHaveClass("reveal");
    expect(firstRowTiles[0]).toHaveClass("correct");
  });

  it("renders current guess in the next row", () => {
    const guesses = [
      {
        word: "react",
        states: ["correct", "correct", "correct", "correct", "correct"] as const,
      },
    ];
    const { container } = render(
      <Board
        guesses={guesses as any}
        currentGuess="do"
        wordLength={5}
        maxGuesses={6}
      />
    );
    const rows = container.querySelectorAll(".row");
    // Second row (index 1) should have the current guess
    const secondRowTiles = rows[1].querySelectorAll(".tile");
    expect(secondRowTiles[0].textContent).toBe("d");
    expect(secondRowTiles[1].textContent).toBe("o");
    expect(secondRowTiles[2].textContent).toBe("");
  });

  it("renders empty rows for remaining guesses", () => {
    const { container } = render(
      <Board guesses={[]} currentGuess="" wordLength={5} maxGuesses={6} />
    );
    const rows = container.querySelectorAll(".row");
    for (let i = 0; i < 6; i++) {
      const tiles = rows[i].querySelectorAll(".tile");
      for (const tile of tiles) {
        expect(tile.textContent).toBe("");
      }
    }
  });
});
