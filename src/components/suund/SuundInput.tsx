"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CgClose, CgOptions } from "react-icons/cg";
import { FaArrowUpLong } from "react-icons/fa6";
import { ComboBox } from "../ComboBox";
import { Slider } from "../ui/slider";
import { Disc3, Languages, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeneratePlaylistRequest } from "@/app/types/Playlist";

const genres = [
  "Random mix",
  "Pop",
  "Rock",
  "Rap",
  "Indie",
  "Jazz",
  "Electronic",
  "Hip-hop",
  "Lo-fi",
  "Classical",
  "Latin",
  "K-pop",
  "Folk",
  "Reggae",
  "Blues",
  "Country",
  "R&B",
  "Metal",
];

const languages = [
  "Auto-detect",
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
];

const nSongs = [5, 10, 15, 20, 25];

type SuundInputProps = {
  onSubmit: (query: GeneratePlaylistRequest) => void;
  isLoading: boolean;
};

export default function SuundInput({ onSubmit, isLoading }: SuundInputProps) {
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("random-mix");
  const [numberOfSongs, setNumberOfSongs] = useState(nSongs[1]);
  const [language, setLanguage] = useState("auto-detect");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState("h-8");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    (e: MouseEvent | KeyboardEvent) => {
      if (e.type === "keydown" && (e as KeyboardEvent).key !== "Enter") return;
      e.preventDefault();
      if (mood.trim() === "") return;
      onSubmit({ language, genre, numberOfSongs, mood });
      setIsSettingsOpen(false);
    },
    [language, genre, numberOfSongs, mood],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const newHeight = Math.min(textarea.scrollHeight, 96);
      textarea.style.height = `${newHeight}px`;

      if (newHeight <= 32) setHeight("h-8");
      else if (newHeight >= 96) setHeight("h-24");
      else setHeight("");
    }
  }, [mood]);

  return (
    <div
      className="w-full rounded-[28px] border border-gray-300 bg-[#ffffff] pb-3
        dark:border-gray-700 dark:bg-[#3B3B3B]"
    >
      <div className="relative flex w-full flex-col items-center justify-center">
        <textarea
          ref={textareaRef}
          placeholder="Describe your current mood..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className={`mb-2 mt-4 h-8 max-h-36 w-full resize-none text-ellipsis bg-transparent px-6
            font-[system-ui] leading-[1] placeholder:text-[#a9afb3] focus:outline-none
            ${height}`}
        />
        <div className="flex w-full items-center justify-between px-4">
          <button
            onClick={toggleSettings}
            className={cn(
              `flex h-9 items-center gap-2 overflow-hidden rounded-full px-2 py-2
              font-[system-ui] text-sm leading-[1] text-gray-600 only-hover:bg-black/10
              dark:text-[#c5cbd0] dark:only-hover:bg-white/10`,
              { "bg-black/10 dark:bg-white/10": isSettingsOpen },
            )}
          >
            <AnimatePresence mode="wait">
              {!isSettingsOpen && (
                <motion.div
                  key="options"
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CgOptions />
                </motion.div>
              )}

              {isSettingsOpen && (
                <motion.div
                  key="close"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CgClose />
                </motion.div>
              )}
            </AnimatePresence>
            Advanced Options
          </button>
          <button
            className={cn(
              `bg-accent flex h-9 w-9 items-center justify-center rounded-full font-[system-ui]
              leading-[1] text-white only-hover:bg-[#6C757D] dark:text-black
              dark:only-hover:bg-white`,
              {
                [`pointer-events-none bg-[#00000015] text-white dark:bg-[#ffffff15]
                dark:text-[#3b3b3b]`]: isLoading,
              },
            )}
            onClick={handleSubmit}
            onKeyDown={handleSubmit}
            disabled={isLoading}
          >
            <FaArrowUpLong />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isSettingsOpen && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex w-full flex-col items-center justify-center"
          >
            <div className="my-4 h-[1px] w-[60%] bg-[#c6c6c6] dark:bg-[#757a7c]" />
            <div className="grid w-full grid-cols-1 gap-4 overflow-hidden px-4 md:grid-cols-2">
              <div className="flex h-9 w-full items-center justify-between">
                <div
                  className="flex items-center gap-2 px-2 font-[system-ui] text-sm font-normal text-gray-600
                    dark:text-[#c5cbd0]"
                >
                  <Disc3 className="text-accent w-4" />
                  Genre
                </div>
                <ComboBox
                  name="genre"
                  value={genre}
                  onChange={setGenre}
                  options={genres}
                />
              </div>
              <div className="flex h-9 w-full items-center justify-between">
                <div
                  className="flex items-center gap-2 px-2 font-[system-ui] text-sm font-normal text-gray-600
                    dark:text-[#c5cbd0]"
                >
                  <Languages className="text-accent w-4" />
                  Language
                </div>
                <ComboBox
                  name="language"
                  value={language}
                  onChange={setLanguage}
                  options={languages}
                />
              </div>
              <div className="flex w-full flex-row items-center justify-between gap-2">
                <div
                  className="flex items-center gap-2 self-center px-2 font-[system-ui] text-sm font-normal
                    text-gray-600 dark:text-[#c5cbd0]"
                >
                  <Music className="text-accent w-4" />
                  Songs
                </div>
                <div className="flex h-full justify-center rounded-md bg-[#f8f9fa] dark:bg-[#454545]">
                  {nSongs.map((opt, index) => {
                    const firstOption = index === 0 ? "rounded-s-md" : "";
                    const lastOption =
                      index === nSongs.length - 1 ? "rounded-e-md" : "";
                    return (
                      <button
                        key={opt}
                        onClick={() => setNumberOfSongs(opt)}
                        className={`${
                        numberOfSongs === opt
                            ? "bg-black/10 dark:bg-white/10"
                            : "only-hover:bg-black/10 dark:only-hover:bg-white/10"
                        } ${firstOption} ${lastOption} flex h-9 w-10 items-center justify-center p-2
                        font-[system-ui] text-[12px] text-gray-600 dark:text-[#c5cbd0]`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* <div className="flex h-9 w-full items-center justify-between md:min-w-[215px]">
                <span className="font-[system-ui] text-sm font-normal text-gray-600 dark:text-[#c5cbd0]">
                  Genre
                </span>
                <ComboBox
                  value={genreValue}
                  onChange={setGenreValue}
                  options={genres}
                />
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
