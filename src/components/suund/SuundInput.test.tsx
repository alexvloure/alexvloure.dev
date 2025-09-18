import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import SuundInput from "./SuundInput";

// Mock the ComboBox used by SuundInput to a simple <select />
vi.mock("../ComboBox", () => {
  return {
    ComboBox: ({ name, value, onChange, options }: any) => {
      return (
        <select
          data-testid={`combo-${name}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    },
  };
});

// Import after mocks so the mocked ComboBox is used

describe("SuundInput", () => {
  let onSubmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSubmit = vi.fn();
  });

  it("renders textarea placeholder and buttons", () => {
    render(<SuundInput onSubmit={onSubmit} isLoading={false} />);

    expect(
      screen.getByPlaceholderText("Describe your current mood..."),
    ).toBeInTheDocument();

    // Advanced Options button is visible
    expect(screen.getByText(/Advanced Options/i)).toBeInTheDocument();

    // There should be at least two buttons (advanced + send)
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("does not submit when mood is empty", () => {
    render(<SuundInput onSubmit={onSubmit} isLoading={false} />);

    const buttons = screen.getAllByRole("button");
    const sendBtn = buttons[1]; // send button is the second one initially
    fireEvent.click(sendBtn);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits with mood and default settings", () => {
    render(<SuundInput onSubmit={onSubmit} isLoading={false} />);

    const textarea = screen.getByPlaceholderText(
      "Describe your current mood...",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Chill and relaxed" } });

    const sendBtn = screen.getAllByRole("button")[1];
    fireEvent.click(sendBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      mood: "Chill and relaxed",
      // defaults from component state
      language: "auto-detect",
      genre: "random-mix",
      numberOfSongs: 10,
    });
  });

  it("opens advanced options, updates genre/language/number, and includes them in submit", () => {
    render(<SuundInput onSubmit={onSubmit} isLoading={false} />);

    // Open settings
    const advancedBtn = screen.getByText(/Advanced Options/i);
    fireEvent.click(advancedBtn);

    // ComboBoxes are mocked as select elements
    const genreSelect = screen.getByTestId("combo-genre") as HTMLSelectElement;
    const languageSelect = screen.getByTestId(
      "combo-language",
    ) as HTMLSelectElement;

    // Change genre and language
    fireEvent.change(genreSelect, { target: { value: "Rock" } });
    fireEvent.change(languageSelect, { target: { value: "Spanish" } });

    // Click a number of songs button (e.g., "25")
    const songsBtn = screen.getByText("25");
    fireEvent.click(songsBtn);

    // Close settings so send button is back in expected position
    fireEvent.click(advancedBtn);

    // Enter mood and submit
    const textarea = screen.getByPlaceholderText(
      "Describe your current mood...",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Energetic drive" } });

    const sendBtn = screen.getAllByRole("button")[1];
    fireEvent.click(sendBtn);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      mood: "Energetic drive",
      language: "Spanish",
      genre: "Rock",
      numberOfSongs: 25,
    });
  });

  it("submits when Enter key is pressed on the send button", () => {
    render(<SuundInput onSubmit={onSubmit} isLoading={false} />);

    const textarea = screen.getByPlaceholderText(
      "Describe your current mood...",
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Late night vibes" } });

    const sendBtn = screen.getAllByRole("button")[1];
    fireEvent.keyDown(sendBtn, { key: "Enter", code: "Enter", charCode: 13 });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      mood: "Late night vibes",
      language: "auto-detect",
      genre: "random-mix",
      numberOfSongs: 10,
    });
  });
});
