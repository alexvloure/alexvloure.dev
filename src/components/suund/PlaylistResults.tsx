import { GeneratePlaylistResponse, Playlist } from "@/app/types/Playlist";
import { motion } from "motion/react";
import SongItem from "./SongItem";
import { FaSpotify } from "react-icons/fa";

type PlaylistResultsProps = {
  playlist: Playlist | null;
};

export function PlaylistResults({ playlist }: PlaylistResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-1 flex-col"
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
        <p className="text-gray-600">{playlist?.tracks.length} songs</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex min-h-0 w-full flex-1 flex-col gap-3 overflow-auto pr-2"
      >
        {playlist?.tracks?.map((song, index) => (
          <SongItem key={song.spotifyId} song={song} index={index} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="sticky bottom-0 my-2 flex items-center justify-center py-2"
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
  );
}
