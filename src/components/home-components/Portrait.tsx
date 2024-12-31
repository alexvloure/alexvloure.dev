import Image from "next/image";
import alexvloure_waving from "@/assets/images/alexvloure-waving_upscaled.avif";

export function Portrait() {
  return (
    <div
      className="border-gray-30 order-1 col-span-12 border-x px-6 dark:border-gray-700 md:order-2
        md:col-span-6 md:border-l-0 md:border-r md:py-8 xl:col-span-4"
    >
      <div className="relative">
        <Image
          src={alexvloure_waving}
          priority={true}
          alt="Alexvloure image"
          className="z-10 max-w-[200px] rounded-3xl object-cover object-center grayscale
            md:max-w-full"
        />
        <div
          className="absolute bottom-0 left-0 h-12 w-full
            bg-[linear-gradient(to_top,var(--background)_0%,transparent)]"
        />
      </div>
    </div>
  );
}
