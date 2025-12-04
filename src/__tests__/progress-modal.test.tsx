import React from "react";
import { render, screen } from "@testing-library/react";
import { ProgressModal } from "@/components/progress-modal";

describe("ProgressModal", () => {
  it("should not render when isOpen is false", () => {
    const { container } = render(
      <ProgressModal isOpen={false} currentStep={0} language="en" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render when isOpen is true", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="en" />);
    expect(screen.getByText("Processing Your Submission")).toBeInTheDocument();
  });

  it("should show English content when language is en", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="en" />);
    expect(screen.getByText("Processing Your Submission")).toBeInTheDocument();
    expect(screen.getByText("This may take a few seconds...")).toBeInTheDocument();
    expect(screen.getByText("Capturing form data...")).toBeInTheDocument();
  });

  it("should show Spanish content when language is es", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="es" />);
    expect(screen.getByText("Procesando Su Envío")).toBeInTheDocument();
    expect(screen.getByText("Esto puede tomar unos segundos...")).toBeInTheDocument();
    expect(screen.getByText("Capturando datos del formulario...")).toBeInTheDocument();
  });

  it("should show correct step label for step 0", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="en" />);
    expect(screen.getByText("Capturing form data...")).toBeInTheDocument();
  });

  it("should show correct step label for step 1", () => {
    render(<ProgressModal isOpen={true} currentStep={1} language="en" />);
    expect(screen.getByText("Processing submission...")).toBeInTheDocument();
  });

  it("should show correct step label for step 2", () => {
    render(<ProgressModal isOpen={true} currentStep={2} language="en" />);
    expect(screen.getByText("Saving to database...")).toBeInTheDocument();
  });

  it("should show correct step label for step 3", () => {
    render(<ProgressModal isOpen={true} currentStep={3} language="en" />);
    expect(screen.getByText("Almost done...")).toBeInTheDocument();
  });

  it("should render all step indicators", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="en" />);
    expect(screen.getByText("Capture")).toBeInTheDocument();
    expect(screen.getByText("Process")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("should render Spanish step names", () => {
    render(<ProgressModal isOpen={true} currentStep={0} language="es" />);
    expect(screen.getByText("Captura")).toBeInTheDocument();
    expect(screen.getByText("Proceso")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
    expect(screen.getByText("Hecho")).toBeInTheDocument();
  });

  it("should show checkmark for completed steps", () => {
    render(<ProgressModal isOpen={true} currentStep={2} language="en" />);
    // Steps 0 and 1 should have checkmarks
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks).toHaveLength(2);
  });

  it("should handle step beyond last step gracefully", () => {
    render(<ProgressModal isOpen={true} currentStep={10} language="en" />);
    // Should show the last step label when currentStep exceeds steps array
    expect(screen.getByText("Almost done...")).toBeInTheDocument();
  });
});
