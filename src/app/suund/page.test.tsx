import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { vi, describe, it, expect, afterEach, Mock } from "vitest";
import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import Suund from "./page";

vi.mock("@/hooks/useGeneratePlaylist", () => ({
  useGeneratePlaylist: vi.fn(),
}));

vi.mock("@/components/suund/AlbumCarousel", () => ({
  AlbumCarousel: () => <div data-testid="album-carousel">carousel</div>,
}));

vi.mock("@/components/suund/SuundLoadingOverlay", () => ({
  SuundLoadingOverlay: () => (
    <div data-testid="suund-loading-overlay">loading</div>
  ),
}));

vi.mock("@/components/suund/PlaylistResults", () => ({
  PlaylistResults: ({ playlist }: any) => (
    <div data-testid="playlist-results">{playlist?.name ?? "no-playlist"}</div>
  ),
}));

vi.mock("@/components/suund/SuundInput", () => ({
  __esModule: true,
  default: ({ onSubmit, isLoading }: any) => (
    <div>
      <button
        data-testid="suund-input-submit"
        onClick={() =>
          onSubmit({
            language: "en",
            genre: "pop",
            numberOfSongs: 5,
            mood: "happy",
          })
        }
      >
        submit
      </button>
      <div data-testid="suund-input-loading">
        {isLoading ? "loading" : "idle"}
      </div>
    </div>
  ),
}));

const mockUseGenerate = useGeneratePlaylist as Mock;

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("Suund page component", () => {
  it("adds lock-scroll to body on mount and removes on unmount", () => {
    mockUseGenerate.mockReturnValue({
      mutate: vi.fn(),
      playlist: null,
      isLoading: false,
      isSuccess: false,
    });

    const { unmount } = render(<Suund />);
    expect(document.body.classList.contains("lock-scroll")).toBe(true);
    unmount();
    expect(document.body.classList.contains("lock-scroll")).toBe(false);
  });

  it("shows the album carousel when idle (not success)", () => {
    mockUseGenerate.mockReturnValue({
      mutate: vi.fn(),
      playlist: null,
      isLoading: false,
      isSuccess: false,
    });

    render(<Suund />);
    expect(screen.getByTestId("album-carousel")).toBeInTheDocument();
    expect(
      screen.queryByTestId("suund-loading-overlay"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("playlist-results")).not.toBeInTheDocument();
  });

  it("shows the loading overlay when isLoading is true", () => {
    mockUseGenerate.mockReturnValue({
      mutate: vi.fn(),
      playlist: null,
      isLoading: true,
      isSuccess: false,
    });

    render(<Suund />);
    expect(screen.getByTestId("suund-loading-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("album-carousel")).toBeInTheDocument();
  });

  it("shows playlist results when isSuccess and playlist present and not loading", () => {
    mockUseGenerate.mockReturnValue({
      mutate: vi.fn(),
      playlist: { name: "My Playlist" },
      isLoading: false,
      isSuccess: true,
    });

    render(<Suund />);
    expect(screen.getByTestId("playlist-results")).toHaveTextContent(
      "My Playlist",
    );
    expect(screen.queryByTestId("album-carousel")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("suund-loading-overlay"),
    ).not.toBeInTheDocument();
  });

  it("calls mutate when SuundInput submits", () => {
    const mutateMock = vi.fn();
    mockUseGenerate.mockReturnValue({
      mutate: mutateMock,
      playlist: null,
      isLoading: false,
      isSuccess: false,
    });

    render(<Suund />);
    fireEvent.click(screen.getByTestId("suund-input-submit"));

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith({
      language: "en",
      genre: "pop",
      numberOfSongs: 5,
      mood: "happy",
    });
  });
});
