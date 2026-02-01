import { describe, it, expect, vi } from "vitest";
import { render, within, fireEvent } from "@testing-library/react";
import Keyboard from "../components/Keyboard";
import { LetterState } from "../words";

describe("Keyboard", () => {
  it("renders all letter keys", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    for (const letter of "qwertyuiopasdfghjklzxcvbnm") {
      expect(within(container).getByText(letter)).toBeInTheDocument();
    }
  });

  it("renders Enter and Backspace keys", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    expect(within(container).getByText("Enter")).toBeInTheDocument();
    expect(within(container).getByText("⌫")).toBeInTheDocument();
  });

  it("calls onKey when a letter is clicked", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    fireEvent.click(within(container).getByText("a"));
    expect(onKey).toHaveBeenCalledWith("a");
  });

  it("calls onKey with Enter when Enter is clicked", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    fireEvent.click(within(container).getByText("Enter"));
    expect(onKey).toHaveBeenCalledWith("Enter");
  });

  it("calls onKey with Backspace when backspace is clicked", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    fireEvent.click(within(container).getByText("⌫"));
    expect(onKey).toHaveBeenCalledWith("Backspace");
  });

  it("applies letter state classes", () => {
    const onKey = vi.fn();
    const states = new Map<string, LetterState>([
      ["r", "correct"],
      ["e", "present"],
      ["x", "absent"],
    ]);
    const { container } = render(
      <Keyboard letterStates={states} onKey={onKey} />
    );

    expect(within(container).getByText("r")).toHaveClass("correct");
    expect(within(container).getByText("e")).toHaveClass("present");
    expect(within(container).getByText("x")).toHaveClass("absent");
  });

  it("applies wide class to Enter and Backspace", () => {
    const onKey = vi.fn();
    const { container } = render(
      <Keyboard letterStates={new Map()} onKey={onKey} />
    );

    expect(within(container).getByText("Enter")).toHaveClass("wide");
    expect(within(container).getByText("⌫")).toHaveClass("wide");
  });
});
