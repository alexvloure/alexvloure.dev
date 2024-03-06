'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function LangBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const language = localStorage.getItem('language');

    if (language === 'es') {
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
          transition={{ duration: 0.5 }}>
          <div className="w-screen min-h-[80px] p-4 sm:p-0 sm:min-h-[35px] flex justify-center items-center font-medium text-black dark:bg-gradient-to-l dark:from-violet-300 dark:to-violet-600 bg-gradient-to-l from-red-300 via-red-500 to-yellow-300">
            <p>
              Este blog solo está disponible en inglés por el momento, disculpa
              las molestias.
            </p>
            <button onClick={() => setOpen(false)}>
              <IoMdClose className="cursor-pointer w-6 h-6 stroke-[10] sm:ml-4 transition-transform hover:rotate-180 duration-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
