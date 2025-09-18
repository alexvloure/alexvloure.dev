import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import SongItem from "./SongItem";

// Mock motion/react to capture the transition.delay prop on a data attribute
vi.mock("motion/react", () => {
  return {
    motion: {
      div: (props: any) => {
        const { children, transition } = props;
        return <div data-delay={String(transition?.delay)}>{children}</div>;
      },
    },
  };
});

describe("SongItem", () => {
  it("renders title, artist, image, and formatted duration; exposes motion delay based on index", () => {
    const song = {
      spotifyId: "s1",
      title: "My Song",
      artist: "The Artist",
      albumImage: "/cover.jpg",
      durationMs: 201000,
    } as any;

    const { container } = render(<SongItem song={song} index={2} />);

    // Title and artist
    expect(screen.getByText("My Song")).toBeTruthy();
    expect(screen.getByText("The Artist")).toBeTruthy();

    // Image rendered with correct alt and src (mocked next/image)
    const img = screen.getByAltText(
      "album cover for My Song",
    ) as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain("/cover.jpg");

    // Formatted time (mocked)
    expect(screen.getByText("03:21")).toBeTruthy();

    // Motion mock exposes the computed delay = index * 0.1 + 0.3 -> 2*0.1+0.3 = 0.5
    const motionDiv = container.querySelector("div[data-delay]");
    expect(motionDiv).toBeTruthy();
    expect(motionDiv?.getAttribute("data-delay")).toBe("0.5");
  });

  it("renders a placeholder when albumImage is not provided", () => {
    const song = {
      spotifyId: "s2",
      title: "No Image Song",
      artist: "Solo",
      albumImage: null,
      durationMs: 120000,
    } as any;

    const { container } = render(<SongItem song={song} index={0} />);

    // No img should be rendered
    expect(screen.queryByAltText(/album cover for/)).toBeNull();

    // Placeholder has class bg-gray-600 in the component; assert it's present
    const placeholder = container.querySelector(".bg-gray-600");
    expect(placeholder).toBeTruthy();

    // Formatted time still shown (mocked)
    expect(screen.getByText("02:00")).toBeTruthy();
  });
});
