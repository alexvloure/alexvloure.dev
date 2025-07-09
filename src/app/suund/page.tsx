"use client";

import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const images = [
  "/images/suund/channel-orange.webp",
  "/images/suund/local-mvp.webp",
  "/images/suund/f1-trillion.webp",
  "/images/suund/t-cross.webp",
  "/images/suund/ilovelife-thankyou.webp",
  "/images/suund/motm-teod.webp",
  "/images/suund/actual-life-3.webp",
  "/images/suund/beyonce-platinum-edition.webp",
  "/images/suund/gnx.webp",
  "/images/suund/mbdtf.webp",
  "/images/suund/flower-boy.webp",
  "/images/suund/the-end.webp",
];

export default function Suund() {
  const [mood, setMood] = useState("");
  const { mutate, data, isLoading, isSuccess } = useGeneratePlaylist();
  const carouselRef = useRef<HTMLDivElement>(null);

  console.log("data", data);

  const handleMutate = useCallback(() => {
    if (mood.trim() === "") return;
    mutate(mood);
  }, [mood, mutate]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col">
      <div className="flex flex-1 flex-col gap-8 px-5 py-[15vh]">
        <div className=""></div>
        <main className="flex justify-center">
          <div
            className="border-gray-30 mx-auto flex min-h-[400px] w-full max-w-[600px] flex-col
              items-center justify-center rounded-2xl"
          >
            <div className="flex h-full w-full flex-col items-center justify-start gap-4 p-8">
              <h4 className="text-[64px] font-semibold leading-[normal] text-[var(--accent)]">
                suund
              </h4>
              <p className="mb-6 text-center text-gray-600">
                Let AI turn your mood into music — whether you&apos;re
                recharging, reflecting, or getting ready to move, suund brings
                the right sound at the right time.
              </p>
              <div className="relative flex w-full items-center justify-center">
                <input
                  type="text"
                  placeholder="Describe your current mood..."
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="h-11 w-full rounded-full border border-gray-300 p-2 pl-4 pr-28 text-sm
                    focus:border-[var(--accent)] focus:outline-none dark:border-gray-700"
                />
                <button
                  className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-full bg-white px-4 py-2
                    text-white hover:bg-[var(--accent)] focus:outline-none
                    disabled:cursor-not-allowed disabled:bg-transparent dark:text-black"
                  onClick={handleMutate}
                  disabled={isLoading}
                >
                  Generate
                </button>
              </div>

              {/* TODO: componetize this */}
              <div
                className="relative mt-10 w-[calc(100%-2px)] max-w-[532px] self-center overflow-hidden
                  bg-[var(--background)] py-4 before:absolute before:left-0 before:top-0
                  before:z-[2] before:h-full before:w-[100px]
                  before:bg-[linear-gradient(to_right,var(--background),transparent)]
                  before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2]
                  after:h-full after:w-[100px] after:-scale-x-100
                  after:bg-[linear-gradient(to_right,var(--background),transparent)]
                  after:content-['']"
              >
                {!isSuccess && (
                  <div
                    className="w-[calc(1680px * 2)] flex animate-infinite-scroll-images gap-10"
                    ref={carouselRef}
                  >
                    {images.map((path, index) => (
                      <Image
                        className="mx-auto flex items-center justify-center rounded-lg"
                        width={100}
                        height={100}
                        key={index}
                        src={path}
                        alt={`album cover ${index + 1}`}
                      />
                    ))}
                    {images.map((path, index) => (
                      <Image
                        className="mx-auto flex items-center justify-center rounded-lg"
                        width={100}
                        height={100}
                        key={index + images.length}
                        src={path}
                        alt={`album cover ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* TODO: componetize this */}
                {isLoading && (
                  <div
                    className="bg-opacity-85 absolute inset-0 flex items-center justify-center rounded-lg
                      bg-[#0c0c0cd1] backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="audio-waveform flex h-12 items-end gap-1">
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                        <div className="waveform-bar w-1 rounded-sm bg-gradient-to-t from-[var(--accent)] to-[#2e2e2e]"></div>
                      </div>
                      <p className="text-sm font-medium text-gray-400">
                        Suund is analyzing your musical mood...
                      </p>
                    </div>
                  </div>
                )}

                {/* TODO: componetize this */}
                {isSuccess && data && (
                  <div className="animate-fade-in transition-all duration-700 ease-in-out">
                    <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
                      {data.playlist?.map((song, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-[var(--background)]
                            p-3 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700
                            dark:hover:bg-gray-800"
                          style={{
                            animation: `slide-in-up 0.6s ease-out forwards ${index * 0.1}s`,
                            // opacity: 0,
                            transform: "translateY(20px)",
                          }}
                        >
                          <div
                            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg
                              bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]"
                          >
                            <span className="text-sm font-semibold text-white">
                              {index + 1}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate font-medium text-gray-900 dark:text-white">
                              {song.title}
                            </h3>
                            <p className="truncate text-sm text-gray-600 dark:text-gray-400">
                              {song.artist}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 text-[var(--accent)] opacity-60">
                              <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Generate new playlist button */}
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => {
                          setMood("");
                          window.location.reload(); // Simple reset, you might want to implement a proper reset
                        }}
                        className="rounded-full bg-[var(--accent)] px-6 py-2 font-medium text-white
                          transition-colors duration-200 hover:bg-[var(--accent-hover)]"
                      >
                        Create Another Playlist
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
