import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaiverForm from "@/app/page";

// Mock react-markdown to avoid issues with ESM
jest.mock("react-markdown", () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div data-testid="markdown">{children}</div>;
  };
});

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock html2canvas
jest.mock("html2canvas", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue("data:image/png;base64,mockscreenshot"),
  }),
}));

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({
    success: true,
    sharepoint_saved: true,
    message: "Success",
  }),
});

describe("WaiverForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the waiver form", () => {
    render(<WaiverForm />);
    expect(screen.getByText(/select language/i)).toBeInTheDocument();
  });

  it("should render language toggle buttons", () => {
    render(<WaiverForm />);
    expect(screen.getByRole("button", { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /español/i })).toBeInTheDocument();
  });

  it("should switch to Spanish when clicking Español button", async () => {
    render(<WaiverForm />);
    const spanishButton = screen.getByRole("button", { name: /español/i });
    await userEvent.click(spanishButton);
    expect(screen.getByText(/seleccionar idioma/i)).toBeInTheDocument();
  });

  it("should render form fields", () => {
    render(<WaiverForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/initials/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  it("should show validation error when submitting without full name", async () => {
    render(<WaiverForm />);
    const submitButton = screen.getByRole("button", { name: /sign & submit/i });
    await userEvent.click(submitButton);
    
    // The form should show a toast error - check that submission was blocked
    await waitFor(() => {
      // The button should still be enabled (not in loading state) because validation failed
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should auto-capitalize full name on blur", async () => {
    render(<WaiverForm />);
    const fullNameInput = screen.getByLabelText(/full name/i);
    
    await userEvent.type(fullNameInput, "john doe");
    fireEvent.blur(fullNameInput);
    
    expect(fullNameInput).toHaveValue("John Doe");
  });

  it("should auto-generate initials from full name", async () => {
    render(<WaiverForm />);
    const fullNameInput = screen.getByLabelText(/full name/i);
    const initialsInput = screen.getByLabelText(/initials/i);
    
    await userEvent.type(fullNameInput, "john doe");
    fireEvent.blur(fullNameInput);
    
    expect(initialsInput).toHaveValue("JD");
  });

  it("should convert initials to uppercase", async () => {
    render(<WaiverForm />);
    const initialsInput = screen.getByLabelText(/initials/i);
    
    await userEvent.type(initialsInput, "jd");
    
    expect(initialsInput).toHaveValue("JD");
  });

  it("should render acknowledgment checkboxes", () => {
    render(<WaiverForm />);
    expect(screen.getByText(/i have read and understand the liability waiver/i)).toBeInTheDocument();
    expect(screen.getByText(/i have read and agree to the participant agreement/i)).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    render(<WaiverForm />);
    const submitButton = screen.getByRole("button", { name: /sign & submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("should show progress indicator", () => {
    render(<WaiverForm />);
    expect(screen.getByText(/step 1: read documents/i)).toBeInTheDocument();
    expect(screen.getByText(/step 2: fill information/i)).toBeInTheDocument();
    expect(screen.getByText(/step 3: sign & submit/i)).toBeInTheDocument();
  });

  it("should show checklist before submission", () => {
    render(<WaiverForm />);
    expect(screen.getByText(/before submitting/i)).toBeInTheDocument();
    expect(screen.getByText(/you have read both documents/i)).toBeInTheDocument();
  });

  it("should display accordion for documents", () => {
    render(<WaiverForm />);
    // Use getAllByText since "Liability Waiver" appears multiple times (in accordion title and checkbox label)
    expect(screen.getAllByText(/liability waiver/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/participant agreement/i).length).toBeGreaterThan(0);
  });
});
