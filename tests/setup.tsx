// 1) Extend expect() with jest-dom matchers (Vitest-compatible import)
import "@testing-library/jest-dom/vitest"; // official way for Vitest
import { cleanup } from "@testing-library/react";
// 2) Useful RTL defaults (optional)
// nothing strictly required here

// 3) Mock Next.js bits commonly used in App Router client components

// next/image → render as a plain <img>, so you can assert on alt/src/etc.
import React from "react";
import { afterEach, vi } from "vitest";
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// next/navigation → minimal mocks for router & helpers
vi.mock("next/navigation", async () => {
  // If you need the actual types, you can import them dynamically:
  // const actual = await vi.importActual<typeof import('next/navigation')>('next/navigation')
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn?.() ?? vi.fn(),
      prefetch: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    redirect: vi.fn(), // so `redirect()` calls don't blow up in tests
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
