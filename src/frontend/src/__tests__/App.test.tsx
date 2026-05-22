import { render } from "@testing-library/react";
import App from "../App";
import { describe, it, expect } from "vitest";

describe("App Smoke Test", () => {
  it("deve renderizar o componente App sem quebrar", () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });
});
