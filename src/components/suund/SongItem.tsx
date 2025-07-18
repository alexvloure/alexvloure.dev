import { EnrichedSong } from "@/app/types/Playlist";
import getTimeString from "@/utils/time";
import { motion } from "motion/react";
import Image from "next/image";

type SongItemProps = {
  song: EnrichedSong;
  index: number;
};

export default function SongItem({ song, index }: SongItemProps) {
  return (
    <motion.div
      key={song.spotifyId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      }}
      className="bg-background flex items-center gap-3 rounded-lg p-3 transition-colors
        duration-200 only-hover:bg-gray-50 dark:only-hover:bg-gray-800"
    >
      <div
        className="from-accent flex h-12 w-12 flex-shrink-0 items-center justify-center
          overflow-hidden rounded-lg bg-gradient-to-br to-[hsl(var(--accent-hover))]"
      >
        {song.albumImage ? (
          <Image
            className="mx-auto flex items-center justify-center rounded-lg object-cover"
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
        <span className="text-sm text-gray-600">
          {getTimeString(song.durationMs)}
        </span>
      </div>
    </motion.div>
  );
}
