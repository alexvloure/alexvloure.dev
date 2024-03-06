import Image from 'next/image';
import alexvloure_waving from '@/assets/images/alexvloure-waving_upscaled.webp';

export function Portrait() {
  return (
    <div className="relative order-1 md:order-2 col-span-12 md:col-span-6 xl:col-span-4 border-x md:border-r md:border-l-0 border-gray-30 dark:border-gray-700 px-6 md:py-8">
      <Image
        src={alexvloure_waving}
        alt="Alexvloure image"
        className="object-cover object-center rounded-3xl max-w-[200px] md:max-w-full grayscale z-10"
      />
      <div className="absolute bottom-0 md:bottom-8 left-0 h-12 w-full bg-[linear-gradient(to_top,var(--background)_0%,transparent)]" />
    </div>
  );
}
