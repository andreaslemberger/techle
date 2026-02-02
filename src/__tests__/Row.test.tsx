import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Row from "../components/Row";

describe("Row", () => {
  it("renders the correct number of tiles", () => {
    const { container } = render(<Row guess="" wordLength={5} states={[]} isRevealed={false} />);
    expect(container.querySelectorAll(".tile")).toHaveLength(5);
  });

  it("renders letters in tiles", () => {
    const { container } = render(
      <Row guess="react" wordLength={5} states={[]} isRevealed={false} />,
    );
    const tiles = container.querySelectorAll(".tile");
    expect(tiles[0].textContent).toBe("r");
    expect(tiles[1].textContent).toBe("e");
    expect(tiles[2].textContent).toBe("a");
    expect(tiles[3].textContent).toBe("c");
    expect(tiles[4].textContent).toBe("t");
  });

  it("renders empty tiles for missing letters in partial guess", () => {
    const { container } = render(<Row guess="re" wordLength={5} states={[]} isRevealed={false} />);
    const tiles = container.querySelectorAll(".tile");
    expect(tiles[0].textContent).toBe("r");
    expect(tiles[1].textContent).toBe("e");
    expect(tiles[2].textContent).toBe("");
    expect(tiles[3].textContent).toBe("");
    expect(tiles[4].textContent).toBe("");
  });

  it("applies reveal class to tiles when isRevealed is true", () => {
    const states: ("correct" | "present" | "absent")[] = [
      "correct",
      "present",
      "absent",
      "correct",
      "absent",
    ];
    const { container } = render(
      <Row guess="react" wordLength={5} states={states} isRevealed={true} />,
    );
    const tiles = container.querySelectorAll(".tile");
    expect(tiles[0]).toHaveClass("reveal");
    expect(tiles[0]).toHaveClass("correct");
    expect(tiles[1]).toHaveClass("present");
    expect(tiles[2]).toHaveClass("absent");
  });

  it("handles different word lengths", () => {
    const { container } = render(
      <Row guess="dock" wordLength={4} states={[]} isRevealed={false} />,
    );
    expect(container.querySelectorAll(".tile")).toHaveLength(4);
  });
});
