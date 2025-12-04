import "@testing-library/jest-dom";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

// Mock canvas getContext for signature pad tests
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  fillStyle: "",
  fillRect: jest.fn(),
  lineWidth: 0,
  lineCap: "",
  lineJoin: "",
  strokeStyle: "",
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
});

HTMLCanvasElement.prototype.toDataURL = jest.fn().mockReturnValue("data:image/png;base64,mockdata");
