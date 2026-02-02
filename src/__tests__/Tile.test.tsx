import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tile from "../components/Tile";

describe("Tile", () => {
  it("renders the letter", () => {
    render(<Tile letter="A" state="empty" reveal={false} delay={0} />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders empty tile with no letter", () => {
    const { container } = render(<Tile letter="" state="empty" reveal={false} delay={0} />);
    expect(container.querySelector(".tile")).toBeInTheDocument();
    expect(container.querySelector(".tile")!.textContent).toBe("");
  });

  it("applies filled class when letter is present", () => {
    const { container } = render(<Tile letter="R" state="empty" reveal={false} delay={0} />);
    expect(container.querySelector(".tile")).toHaveClass("filled");
  });

  it("does not apply filled class when letter is empty", () => {
    const { container } = render(<Tile letter="" state="empty" reveal={false} delay={0} />);
    expect(container.querySelector(".tile")).not.toHaveClass("filled");
  });

  it("applies correct class when revealed", () => {
    const { container } = render(<Tile letter="R" state="correct" reveal={true} delay={0} />);
    expect(container.querySelector(".tile")).toHaveClass("correct");
    expect(container.querySelector(".tile")).toHaveClass("reveal");
  });

  it("applies present class when revealed", () => {
    const { container } = render(<Tile letter="R" state="present" reveal={true} delay={0} />);
    expect(container.querySelector(".tile")).toHaveClass("present");
  });

  it("applies absent class when revealed", () => {
    const { container } = render(<Tile letter="R" state="absent" reveal={true} delay={0} />);
    expect(container.querySelector(".tile")).toHaveClass("absent");
  });

  it("does not apply state class when not revealed", () => {
    const { container } = render(<Tile letter="R" state="correct" reveal={false} delay={0} />);
    expect(container.querySelector(".tile")).not.toHaveClass("correct");
    expect(container.querySelector(".tile")).not.toHaveClass("reveal");
  });

  it("applies animation delay when revealed", () => {
    const { container } = render(<Tile letter="R" state="correct" reveal={true} delay={600} />);
    expect(container.querySelector(".tile")).toHaveStyle({
      animationDelay: "600ms",
    });
  });
});
