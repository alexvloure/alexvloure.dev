import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SuundLoadingOverlay } from "./SuundLoadingOverlay";

describe("SuundLoadingOverlay", () => {
  it("renders the loading message", () => {
    render(<SuundLoadingOverlay />);
    expect(
      screen.getByText(/Suund is analyzing your musical mood/i),
    ).toBeInTheDocument();
  });

  it("renders ten waveform bars", () => {
    const { container } = render(<SuundLoadingOverlay />);
    const bars = container.querySelectorAll(".waveform-bar");
    expect(bars).toHaveLength(10);
  });

  it("waveform bars include expected base classes", () => {
    const { container } = render(<SuundLoadingOverlay />);
    const first = container.querySelector(".waveform-bar");
    expect(first).toBeTruthy();
    if (first) {
      expect(first.className).toContain("w-1");
      expect(first.className).toContain("rounded-sm");
      expect(first.className).toContain("bg-gradient-to-t");
    }
  });

  it("matches snapshot", () => {
    const { container } = render(<SuundLoadingOverlay />);
    expect(container).toMatchSnapshot();
  });
});
