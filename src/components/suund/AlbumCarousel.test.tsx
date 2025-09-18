import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AlbumCarousel } from "./AlbumCarousel";

describe("AlbumCarousel", () => {
  it("renders without crashing and contains the scrolling container", () => {
    const { container } = render(<AlbumCarousel />);
    // inner scrolling div uses class animate-infinite-scroll-images
    const inner = container.querySelector(".animate-infinite-scroll-images");
    expect(inner).toBeTruthy();
  });

  it("renders images and duplicates them for seamless scroll", () => {
    render(<AlbumCarousel />);

    const imgs = screen.getAllByRole("img");
    // there should be at least one image
    expect(imgs.length).toBeGreaterThan(0);
    // each unique alt text should appear exactly twice (original + duplicated set)
    const alts = imgs.map((img) => (img as HTMLImageElement).alt);
    const uniqueAlts = Array.from(new Set(alts));
    expect(imgs.length).toBe(uniqueAlts.length * 2);

    // verify first album alt and that there are two instances of it
    const firstAlt = "album cover 1";
    const firstAltImgs = screen.getAllByAltText(firstAlt);
    expect(firstAltImgs.length).toBe(2);

    // verify the src for the first album is the expected path
    // (relies on the component's images array order)
    expect((firstAltImgs[0] as HTMLImageElement).getAttribute("src")).toContain(
      "/images/suund/f1-trillion.webp",
    );

    // verify width/height props from the component are passed through by the mock
    expect((firstAltImgs[0] as HTMLImageElement).getAttribute("width")).toBe(
      "100",
    );
    expect((firstAltImgs[0] as HTMLImageElement).getAttribute("height")).toBe(
      "100",
    );
  });

  it("applies layout/utility classes to images", () => {
    render(<AlbumCarousel />);
    const firstImg = screen.getAllByRole("img")[0] as HTMLImageElement;
    // classes from the component should be present on the rendered img
    expect(firstImg.className).toMatch(/pointer-events-none/);
    expect(firstImg.className).toMatch(/rounded-sm/);
  });
});
