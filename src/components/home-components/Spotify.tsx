"use client";

import { useSpotify } from "@/hooks/useSpotify";
import { Loader } from "../Loader";
import noise from "@/assets/images/noise-resized.gif";
import { SpotifySkeleton } from "./skeletons/SpotifySkeleton";

export function Spotify() {
  const { data, isLoading } = useSpotify();

  const togglePlay = () => {
    if (!data.preview_url) return;
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
    audio.volume = 1;
    audio.play();
  };

  const pause = () => {
    const audio = document.getElementById("music") as HTMLAudioElement;
    const vinyl = document.getElementById("vinyl") as HTMLDivElement;
    vinyl.style.animationPlayState = "paused";
    audio.pause();
  };

  return (
    <div
      className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-gray-200
        via-white to-white px-8 py-4 dark:border-gray-500 dark:from-gray-900
        dark:via-gray-1000 dark:to-gray-1000 md:py-8"
    >
      <h1
        className="border-gray-30 mb-4 border-b pb-4 text-right text-sm font-semibold text-gray-600
          dark:border-gray-700"
      >
        RECENTLY PLAYED
      </h1>
      <Loader isLoading={isLoading} fallback={<SpotifySkeleton />}>
        <div className="flex items-center justify-end gap-4">
          <div className="flex flex-col text-right">
            <h4 className="line-clamp-1 overflow-hidden text-ellipsis text-lg leading-normal">
              {data?.name}
            </h4>
            <p
              className="line-clamp-2 overflow-hidden text-ellipsis whitespace-normal text-base
                leading-normal text-gray-600"
            >
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
            className={`border-gray-30 flex aspect-square h-[60px] w-[60px] animate-spin-slow
              ${!!data?.preview_url && "cursor-pointer"} items-center justify-center
              rounded-full border bg-cover bg-center [animation-play-state:paused]
              hover:opacity-90 dark:border-gray-700`}
          >
            <div className="z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)]">
              <div className="z-30 h-1 w-1 rounded-full bg-[rgba(0,0,0,1)]" />
            </div>
            <audio src={data?.preview_url} id="music" onEnded={pause}></audio>
          </div>
        </div>
      </Loader>
    </div>
  );
}
