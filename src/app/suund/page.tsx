"use client";

import { useGeneratePlaylist } from "@/hooks/useGeneratePlaylist";
import { useCallback, useLayoutEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SuundLoadingOverlay } from "@/components/suund/SuundLoadingOverlay";
import { AlbumCarousel } from "@/components/suund/AlbumCarousel";
import SuundInput from "@/components/suund/SuundInput";
import { GeneratePlaylistRequest } from "../types/Playlist";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { cn } from "@/lib/utils";
import { PlaylistResults } from "@/components/suund/PlaylistResults";

export default function Suund() {
  const { mutate, playlist, isLoading, isSuccess } = useGeneratePlaylist();

  const handleMutate = useCallback(
    ({ language, genre, numberOfSongs, mood }: GeneratePlaylistRequest) => {
      mutate({ language, genre, numberOfSongs, mood });
    },
    [mutate],
  );

  useLayoutEffect(() => {
    document.body.classList.add("lock-scroll");
    return () => {
      document.body.classList.remove("lock-scroll");
    };
  }, []);

  const getCurrentState = useCallback(() => {
    if (isSuccess && playlist) return "success";
    return "idle";
  }, [isSuccess, playlist]);

  const {
    shouldShowResults,
    shouldShowLoading,
    shouldShowCarousel,
    shouldShowReducedTitle,
  } = useMemo(
    () => ({
      shouldShowResults: isSuccess && playlist && !isLoading,
      shouldShowLoading: isLoading,
      shouldShowCarousel: !isSuccess || (isSuccess && isLoading),
      shouldShowReducedTitle: isSuccess && playlist,
    }),
    [isSuccess, playlist, isLoading],
  );

  return (
    <div className="mx-auto flex h-[100dvh] w-full flex-col justify-between px-2 md:px-0">
      <div className="sticky top-0 flex w-full flex-col justify-center gap-0 md:gap-6">
        <Link
          href="/"
          className="ml-2 mt-4 flex w-[85px] items-center gap-2 rounded-md bg-black/10 px-3 py-1
            text-gray-600 only-hover:bg-black/20 dark:bg-white/10 dark:text-gray-400
            dark:only-hover:bg-white/20 md:ml-4"
        >
          <MdArrowBack className="w-4" />
          <span className="mt-1 text-[10px] font-semibold">HOME</span>
        </Link>
        <div className="mx-auto flex w-full max-w-[532px] flex-col items-center justify-center px-6">
          <h4
            className={cn(
              "text-accent font-semibold leading-[normal] transition-all duration-300",
              shouldShowReducedTitle ? "text-[42px]" : "text-[64px]",
            )}
          >
            suund
          </h4>
          <AnimatePresence mode="sync">
            {!shouldShowReducedTitle && (
              <motion.div
                key="description"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-gray-600">
                  Let AI turn your mood into music — whether you&apos;re
                  recharging, reflecting, or getting ready to move, suund brings
                  the right sound at the right time.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div
        className="mx-auto flex min-h-0 w-full max-w-[600px] flex-1 flex-col items-center
          justify-between"
      >
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-4 px-2">
          <div className="relative mt-4 flex min-h-0 w-full max-w-[532px] flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={getCurrentState()}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="bg-background flex w-full overflow-hidden"
              >
                {shouldShowCarousel && <AlbumCarousel />}
                {shouldShowLoading && <SuundLoadingOverlay />}
                {shouldShowResults && <PlaylistResults playlist={playlist} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-10 w-full pb-4">
        <SuundInput onSubmit={handleMutate} isLoading={isLoading} />
      </div>
    </div>
  );
}
