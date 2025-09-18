import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { PlaylistResults } from "./PlaylistResults";
import { Playlist } from "@/app/types/Playlist";

// Mock motion/react to render plain divs so animations don't interfere with tests
vi.mock("motion/react", () => {
  const Div: any = (props: any) => <div {...props} />;
  return {
    motion: {
      div: Div,
    },
  };
});

// Mock SongItem to render a predictable DOM node we can assert against
vi.mock("./SongItem", () => {
  return {
    __esModule: true,
    default: ({ song, index }: any) => (
      <div data-testid="song-item">
        {song.title}-{index}
      </div>
    ),
  };
});

describe("PlaylistResults", () => {
  const samplePlaylist: Playlist = {
    name: "Chill Vibes",
    url: "https://open.spotify.com/playlist/123",
    tracks: [
      {
        spotifyId: "s1",
        title: "Song One",
        artist: "Artist A",
        album: "Album A",
        durationMs: 210000,
      },
      {
        spotifyId: "s2",
        title: "Song Two",
        artist: "Artist B",
        album: "Album B",
        durationMs: 185000,
      },
      {
        spotifyId: "s3",
        title: "Song Three",
        artist: "Artist C",
        album: "Album C",
        durationMs: 240000,
      },
    ],
  };

  it("renders playlist name and song count and a SongItem per track", () => {
    render(<PlaylistResults playlist={samplePlaylist} />);

    // Name
    expect(
      screen.getByRole("heading", { name: /Chill Vibes/i }),
    ).toBeInTheDocument();

    // Song count text
    expect(screen.getByText(/3 songs/i)).toBeInTheDocument();

    // Song items rendered (mocked)
    const items = screen.getAllByTestId("song-item");
    expect(items).toHaveLength(samplePlaylist.tracks.length);
    expect(items[0]).toHaveTextContent("Song One-0");
    expect(items[1]).toHaveTextContent("Song Two-1");
    expect(items[2]).toHaveTextContent("Song Three-2");
  });

  it("renders Open in Spotify link with correct href and target", () => {
    render(<PlaylistResults playlist={samplePlaylist as any} />);

    const link = screen.getByRole("link", { name: /Open in Spotify/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", samplePlaylist.url);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("handles null playlist without rendering song items or link href", () => {
    render(<PlaylistResults playlist={null} />);

    // No song items should be rendered
    expect(screen.queryByTestId("song-item")).toBeNull();

    // The link exists but should not have an href attribute when playlist is null
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("href");
  });
});
