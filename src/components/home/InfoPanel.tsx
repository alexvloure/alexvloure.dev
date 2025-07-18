import { IconSlider } from "../IconSlider";
import { LocationIcon } from "../icons/LocationIcon";
import { Clock } from "./Clock";
import { Globe } from "./Globe";
import {
  CypressIcon,
  GoIcon,
  JestIcon,
  NextjsIcon,
  ReactIcon,
  ReactQueryIcon,
  TailwindCSSIcon,
  TestingLibraryIcon,
  TypeScriptIcon,
  ViteIcon,
} from "../icons";

const LOGOS = [
  <TypeScriptIcon key="TypeScript" width={24} height={24} />,
  <ReactIcon key="React" width={24} height={24} />,
  <ViteIcon key="Vite" width={24} height={24} />,
  <NextjsIcon key="Next.js" width={54} height={54} />,
  <ReactQueryIcon key="React Query" width={96} height={96} />,
  <TailwindCSSIcon key="TailwindCSS" width={96} height={96} />,
  <JestIcon key="Jest" width={24} height={24} />,
  <TestingLibraryIcon key="Testing Library" width={24} height={24} />,
  <CypressIcon key="Cypress" width={54} height={54} />,
  <GoIcon key="Go" width={36} height={36} />,
];

export function InfoPanel() {
  return (
    <div
      className="border-gray-30 col-span-12 border-x bg-gradient-to-br from-gray-200 via-white
        to-white px-6 py-8 dark:border-gray-700 dark:from-gray-900 dark:via-gray-1000
        dark:to-gray-1000"
    >
      <div className="flex flex-wrap justify-between gap-6 md:gap-0">
        <div
          className="border-gray-30 relative h-[200px] w-full rounded-lg border dark:border-gray-700
            md:w-[49%] xl:w-[32%]"
        >
          <Globe />
          <div className="absolute left-4 top-4 flex gap-2">
            <LocationIcon width={20} height={20} fill="hsl(var(--accent))" />
            <h4 className="mt-1 text-[12px] font-semibold text-gray-600">
              SCQ, Spain
            </h4>
          </div>
        </div>
        <div
          className="border-gray-30 h-[200px] w-full rounded-lg border dark:border-gray-700
            md:w-[49%] xl:w-[32%]"
        >
          <Clock />
        </div>
        <div
          className="border-gray-30 h-[200px] w-full rounded-lg border dark:border-gray-700 md:mt-6
            xl:mt-0 xl:w-[32%]"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="decoration-accent text-gray-600 underline underline-offset-[3px]">
              Tech stack I usually work with
            </p>
            <IconSlider icons={LOGOS} />
          </div>
        </div>
      </div>
    </div>
  );
}
