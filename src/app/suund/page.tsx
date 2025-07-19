"use client";

import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SuundLoadingOverlay } from "@/components/suund/SuundLoadingOverlay";
import { AlbumCarousel } from "@/components/suund/AlbumCarousel";
import { FaSpotify } from "react-icons/fa";
import getTimeString from "@/utils/time";
import SuundInput from "@/components/suund/SuundInput";
import { GeneratePlaylistRequest } from "../types/Playlist";
import SongItem from "@/components/suund/SongItem";
import Link from "next/link";
import { MdArrowBack, MdArrowBackIos } from "react-icons/md";

export default function Suund() {
  const { mutate, playlist, isLoading, isSuccess } = useGeneratePlaylist();

  const handleMutate = useCallback(
    ({ language, genre, numberOfSongs, mood }: GeneratePlaylistRequest) => {
      mutate({ language, genre, numberOfSongs, mood });
    },
    [mutate],
  );

  const getCurrentState = useCallback(() => {
    if (isSuccess && playlist) return "success";
    return "idle";
  }, [isSuccess, playlist]);

  const { shouldShowResults, shouldShowLoading, shouldShowCarousel } = useMemo(
    () => ({
      shouldShowResults: isSuccess && playlist && !isLoading,
      shouldShowLoading: isLoading,
      shouldShowCarousel: !isSuccess || (isSuccess && isLoading),
    }),
    [isSuccess, playlist, isLoading],
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-md flex-col">
      <Link
        href="/"
        className="absolute left-8 top-8 flex items-center gap-2 rounded-md bg-black/10 px-3 py-1
          text-gray-600 only-hover:bg-black/20 dark:bg-white/10 dark:text-gray-400
          dark:only-hover:bg-white/20"
      >
        <MdArrowBack />{" "}
        <span className="mt-1 text-[12px] font-semibold">HOME</span>
      </Link>
      <div className="flex flex-1 flex-col justify-center gap-8 px-2">
        <main className="flex h-[100svh] justify-center">
          <div
            className="border-gray-30 mx-auto flex min-h-[400px] w-full max-w-[600px] flex-col
              items-center justify-center rounded-2xl"
          >
            <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-4 px-6">
              <h4 className="text-accent text-[64px] font-semibold leading-[normal]">
                suund
              </h4>
              <p className="mb-6 text-center text-gray-600">
                Let AI turn your mood into music — whether you&apos;re
                recharging, reflecting, or getting ready to move, suund brings
                the right sound at the right time.
              </p>

              <SuundInput onSubmit={handleMutate} isLoading={isLoading} />

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
                    className="bg-background overflow-hidden"
                  >
                    {shouldShowCarousel && <AlbumCarousel />}
                    {shouldShowLoading && <SuundLoadingOverlay />}
                    {shouldShowResults && (
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
                          transition={{ delay: 0.1 }}
                          className="relative z-10 mb-4 flex items-center justify-around"
                        >
                          <h2 className="w-full max-w-[75%] text-lg font-semibold text-gray-900 dark:text-white">
                            {playlist?.name}
                          </h2>
                          <p className="text-gray-600">
                            {playlist?.tracks.length} songs
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex max-h-[30svh] flex-col gap-3 overflow-y-auto pr-2"
                        >
                          {playlist?.tracks?.map((song, index) => (
                            <SongItem
                              key={song.spotifyId}
                              song={song}
                              index={index}
                            />
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="mt-8 flex items-center justify-self-center"
                        >
                          <a
                            href={playlist?.url}
                            target="_blank"
                            className="bg-accent inline-flex items-center space-x-2 rounded-full px-6 py-2 font-medium
                              text-white transition-colors duration-200 only-hover:hover:bg-[#6C757D]
                              dark:text-black dark:only-hover:hover:bg-white"
                          >
                            <FaSpotify className="text-lg" />
                            <span>Open in Spotify</span>
                          </a>
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
