"use client";

import { useSpotify } from "@/hooks/useSpotify";
import { Loader } from "../Loader";
import noise from "@/assets/images/noise-resized.gif";
import { SpotifySkeleton } from "./skeletons/SpotifySkeleton";

export function Spotify() {
  const { data, isLoading } = useSpotify();

  const togglePlay = () => {
    const audio = document.getElementById("music") as HTMLAudioElement;
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  };

  const play = () => {
    const audio = document.getElementById("music") as HTMLAudioElement;
    const vinyl = document.getElementById("vinyl") as HTMLDivElement;
    vinyl.style.animationPlayState = "running";
    audio.volume = 0.5;
    audio.play();
  };

  const pause = () => {
    const audio = document.getElementById("music") as HTMLAudioElement;
    const vinyl = document.getElementById("vinyl") as HTMLDivElement;
    vinyl.style.animationPlayState = "paused";
    audio.pause();
  };

  return (
    <div className="flex flex-col justify-end h-full w-full px-8 py-4 md:py-8 bg-gradient-to-br from-gray-200 via-white to-white dark:border-gray-500 dark:from-gray-900 dark:via-gray-1000 dark:to-gray-1000">
      <h1 className="mb-4 pb-4 border-b border-gray-30 dark:border-gray-700 text-right text-gray-600 text-sm font-semibold">
        RECENTLY PLAYED
      </h1>
      <Loader isLoading={isLoading} fallback={<SpotifySkeleton />}>
        <div className="flex justify-end items-center gap-4">
          <div className="flex flex-col text-right">
            <h4 className="text-lg leading-normal text-ellipsis overflow-hidden line-clamp-1">
              {data?.name}
            </h4>
            <p className="text-base leading-normal text-gray-600 text-ellipsis overflow-hidden whitespace-normal line-clamp-2">
              {data?.artists.length > 1
                ? data?.artists.map((artist: any) => artist.name).join(", ")
                : data?.artists[0].name}
            </p>
          </div>
          <div
            onClick={togglePlay}
            style={{
              backgroundImage: `url(${data?.album.images[0].url || noise.src})`,
            }}
            id="vinyl"
            className="bg-cover bg-center rounded-full w-[60px] h-[60px] aspect-square animate-spin-slow [animation-play-state:paused] flex justify-center items-center cursor-pointer hover:opacity-90 border border-gray-30 dark:border-gray-700"
          >
            <div className="rounded-full w-5 h-5 z-10 bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
              <div className="rounded-full w-1 h-1 z-30 bg-[rgba(0,0,0,1)]" />
            </div>
            <audio src={data?.preview_url} id="music" onEnded={pause}></audio>
          </div>
        </div>
      </Loader>
    </div>
  );
}
