"use client";

import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SuundLoadingOverlay } from "@/components/suund/SuundLoadingOverlay";
import { AlbumCarousel } from "@/components/suund/AlbumCarousel";

export default function Suund() {
  const [mood, setMood] = useState("");
  const { mutate, playlist, isLoading, isSuccess } = useGeneratePlaylist();

  console.log("playlist", playlist);

  const handleMutate = useCallback(() => {
    if (mood.trim() === "") return;
    mutate(mood);
  }, [mood, mutate]);

  const getCurrentState = useCallback(() => {
    if (isSuccess && playlist) return "success";
    return "idle";
  }, [isSuccess, playlist]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col">
      <div className="flex flex-1 flex-col justify-center gap-8 px-5">
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
                  className="h-11 w-full text-ellipsis rounded-full border border-gray-300 p-2 pl-4 pr-32
                    focus:border-[var(--accent)] focus:outline-none dark:border-gray-700
                    dark:focus:border-[var(--accent)]"
                />
                <button
                  className="dark:only-hover:hover:bg-white only-hover:hover:bg-[#6C757D] absolute right-1.5
                    top-1/2 h-8 -translate-y-1/2 rounded-full bg-[var(--accent)] px-4 py-2
                    leading-[1.25] text-white focus:outline-none disabled:cursor-not-allowed
                    disabled:bg-transparent dark:text-black"
                  onClick={handleMutate}
                  disabled={isLoading}
                >
                  Generate
                </button>
              </div>

              <div className="relative mt-10 w-[calc(100%-2px)] max-w-[532px] self-center">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={getCurrentState()}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      height: { duration: 0.6 },
                    }}
                    style={{ overflow: "hidden" }}
                    className="overflow-hidden bg-[var(--background)] before:absolute before:left-0
                      before:top-0 before:z-[2] before:h-full before:w-[100px]
                      before:bg-[linear-gradient(to_right,var(--background),transparent)]
                      before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2]
                      after:h-full after:w-[100px] after:-scale-x-100
                      after:bg-[linear-gradient(to_right,var(--background),transparent)]
                      after:content-['']"
                  >
                    {!isSuccess && <AlbumCarousel />}
                    {isLoading && <SuundLoadingOverlay />}

                    {/* Success state - Playlist */}
                    {isSuccess && playlist && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pb-4"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2"
                        >
                          {playlist?.map((song, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: index * 0.1 + 0.3,
                                duration: 0.4,
                                ease: "easeOut",
                              }}
                              className="flex items-center gap-3 rounded-lg bg-[var(--background)] p-3 transition-colors
                                duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <div
                                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg
                                  bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)]"
                              >
                                {song.albumImage ? (
                                  <Image
                                    className="mx-auto flex items-center justify-center rounded-lg"
                                    width={48}
                                    height={48}
                                    src={song.albumImage}
                                    alt={`album cover for ${song.title}`}
                                  />
                                ) : (
                                  <div className="h-[48px] w-[48px] rounded-lg bg-gray-600" />
                                )}
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
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
