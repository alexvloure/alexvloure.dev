import Image from "next/image";
import { Card } from "../Card";
import Link from "next/link";

const suundImages = () => (
  <>
    <Image
      src="/images/suund/f1-trillion.webp"
      width={75}
      height={75}
      alt="f1-trillion"
      className="absolute left-[50%] top-14 z-[2] w-[35%] -translate-x-[100%] -rotate-12
        rounded-sm md:top-8 md:w-[75px]"
    />
    <Image
      src="/images/suund/actual-life-3.webp"
      width={75}
      height={75}
      alt="mbdtf"
      className="absolute left-[50%] top-14 z-[1] w-[35%] -translate-x-[50%] rounded-sm md:top-8
        md:w-[75px]"
    />
    <Image
      src="/images/suund/mbdtf.webp"
      width={75}
      height={75}
      alt="mbdtf"
      className="absolute left-[50%] top-14 w-[35%] -translate-x-[0%] rotate-12 rounded-sm
        md:top-8 md:w-[75px]"
    />
  </>
);

export const MiniTools = () => {
  return (
    <div
      className="border-gray-30 col-span-12 flex w-full flex-col gap-4 border-x from-gray-200
        via-white to-white px-6 py-8 dark:border-gray-700 dark:from-gray-900
        dark:via-gray-1000 dark:to-gray-1000 md:py-8"
    >
      <h4 className="text-accent text-[12px] font-semibold uppercase">
        mini tools
      </h4>
      <div className="flex flex-col gap-4 md:flex-row">
        <Link href="/suund">
          <Card
            renderContent={suundImages}
            title="suund"
            description="Describe your current mood and this AI tool will create the perfect playlist to suit you!"
            className="border-gray-30 box-border aspect-square w-full border bg-transparent
              dark:border-gray-700 md:w-[250px]"
          />
        </Link>
        {/* Custom card */}
        <div
          className={`group relative flex aspect-square w-full flex-col items-center justify-center
            overflow-hidden bg-transparent p-6 text-gray-600 dark:text-gray-400 md:w-[250px]`}
        >
          <p className="text-[16px]">more tools</p>
          <p className="text-[24px]">coming soon</p>
        </div>
      </div>
    </div>
  );
};
