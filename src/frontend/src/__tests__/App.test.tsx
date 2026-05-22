import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../app/App";

describe("Smoke Test - App Component", () => {
  it("deve renderizar o componente App sem quebrar", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
