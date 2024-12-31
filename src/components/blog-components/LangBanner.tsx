"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function LangBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem("language");

    if (language === "es") {
      setOpen(true);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex min-h-[80px] w-screen items-center justify-center bg-gradient-to-l
              from-red-300 via-red-500 to-yellow-300 p-4 font-medium text-black
              dark:bg-gradient-to-l dark:from-violet-300 dark:to-violet-600 sm:min-h-[35px]
              sm:p-0"
          >
            <p>
              Este blog solo está disponible en inglés por el momento, disculpa
              las molestias.
            </p>
            <button onClick={() => setOpen(false)}>
              <IoMdClose
                className="duration-400 h-6 w-6 cursor-pointer stroke-[10] transition-transform
                  hover:rotate-180 sm:ml-4"
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
