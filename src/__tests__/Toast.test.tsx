import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "../components/Toast";

describe("Toast", () => {
  it("renders message when provided", () => {
    render(<Toast message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders nothing when message is null", () => {
    const { container } = render(<Toast message={null} />);
    expect(container.innerHTML).toBe("");
  });

  it("has toast class", () => {
    render(<Toast message="Hello" />);
    expect(screen.getByText("Hello")).toHaveClass("toast");
  });
});
