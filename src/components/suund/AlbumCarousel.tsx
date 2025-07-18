import { motion } from "motion/react";
import Image from "next/image";

const images = [
  "/images/suund/f1-trillion.webp",
  "/images/suund/channel-orange.webp",
  "/images/suund/local-mvp.webp",
  "/images/suund/t-cross.webp",
  "/images/suund/ilovelife-thankyou.webp",
  "/images/suund/motm-teod.webp",
  "/images/suund/actual-life-3.webp",
  "/images/suund/beyonce-platinum-edition.webp",
  "/images/suund/gnx.webp",
  "/images/suund/mbdtf.webp",
  "/images/suund/flower-boy.webp",
  "/images/suund/the-end.webp",
];

export const AlbumCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full before:absolute before:left-0 before:top-0 before:z-[2]
        before:h-full before:w-[100px]
        before:bg-[linear-gradient(to_right,hsl(var(--background)),transparent)]
        before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2]
        after:h-full after:w-[100px] after:-scale-x-100
        after:bg-[linear-gradient(to_right,hsl(var(--background)),transparent)]
        after:content-['']"
    >
      <div className="w-[calc(1680px * 2)] flex animate-infinite-scroll-images gap-10">
        {images.map((path, index) => (
          <Image
            className="pointer-events-none mx-auto flex select-none items-center justify-center
              rounded-sm"
            width={100}
            height={100}
            key={index}
            src={path}
            alt={`album cover ${index + 1}`}
          />
        ))}
        {images.map((path, index) => (
          <Image
            className="pointer-events-none mx-auto flex select-none items-center justify-center
              rounded-sm"
            width={100}
            height={100}
            key={index + images.length}
            src={path}
            alt={`album cover ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};
