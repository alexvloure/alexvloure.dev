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
    <div
      className="mx-auto flex max-h-screen min-h-screen w-full flex-1 flex-col justify-between
        overflow-hidden px-2 md:px-0"
    >
      <div className="flex flex-col justify-center gap-8">
        <Link
          href="/"
          className="ml-2 mt-4 flex w-[85px] items-center rounded-md bg-black/10 px-3 py-1
            text-gray-600 only-hover:bg-black/20 dark:bg-white/10 dark:text-gray-400
            dark:only-hover:bg-white/20 md:ml-4"
        >
          <MdArrowBack />{" "}
          <span className="mt-1 text-[12px] font-semibold">HOME</span>
        </Link>
        <div className="flex w-full max-w-[532px] flex-col items-center justify-center self-center px-6">
          <h4 className="text-accent text-[64px] font-semibold leading-[normal]">
            suund
          </h4>
          <p className="text-center text-gray-600">
            Let AI turn your mood into music — whether you&apos;re recharging,
            reflecting, or getting ready to move, suund brings the right sound
            at the right time.
          </p>
        </div>
      </div>
      <div
        className="mx-auto flex h-full w-full max-w-[600px] flex-col items-center justify-center
          rounded-2xl"
      >
        <div className="flex h-full w-full flex-col items-center justify-between gap-4 px-2">
          <div className="relative mt-4 w-[calc(100%-2px)] max-w-[532px] self-center">
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
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mb-4 flex items-center justify-around"
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
                      className="flex max-h-[35svh] flex-col gap-3 overflow-y-auto pr-2"
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
                      className="flex items-center justify-center py-4"
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
      <div className="sticky bottom-0 w-full pb-8">
        <SuundInput onSubmit={handleMutate} isLoading={isLoading} />
      </div>
    </div>
  );
}
