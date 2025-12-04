import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignaturePad } from "@/components/signature-pad";

describe("SignaturePad", () => {
  const mockOnSignatureChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render canvas element", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should render clear button", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const clearButton = screen.getByRole("button", { name: /clear signature/i });
    expect(clearButton).toBeInTheDocument();
  });

  it("should have clear button disabled initially", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const clearButton = screen.getByRole("button", { name: /clear signature/i });
    expect(clearButton).toBeDisabled();
  });

  it("should initialize canvas with correct dimensions", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveAttribute("width", "600");
    expect(canvas).toHaveAttribute("height", "200");
  });

  it("should apply custom className", () => {
    render(
      <SignaturePad
        onSignatureChange={mockOnSignatureChange}
        className="custom-class"
      />
    );
    const container = document.querySelector(".custom-class");
    expect(container).toBeInTheDocument();
  });

  it("should call onSignatureChange with null on clear", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    
    // Simulate drawing
    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 50 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 75 });
    fireEvent.mouseUp(canvas);

    // Clear should be enabled now
    const clearButton = screen.getByRole("button", { name: /clear signature/i });
    fireEvent.click(clearButton);

    // Should call with null after clearing
    expect(mockOnSignatureChange).toHaveBeenCalledWith(null);
  });

  it("should handle mouse events for drawing", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;

    fireEvent.mouseDown(canvas, { clientX: 100, clientY: 50 });
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 75 });
    fireEvent.mouseUp(canvas);

    // Should call onSignatureChange with signature data
    expect(mockOnSignatureChange).toHaveBeenCalled();
  });

  it("should not call onSignatureChange when not drawing", () => {
    render(<SignaturePad onSignatureChange={mockOnSignatureChange} />);
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;

    // Just mouse move without mousedown
    fireEvent.mouseMove(canvas, { clientX: 150, clientY: 75 });

    // Should not be called
    expect(mockOnSignatureChange).not.toHaveBeenCalled();
  });
});
