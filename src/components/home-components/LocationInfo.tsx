import { LocationIcon } from '../icons/LocationIcon';
import { Globe } from './Globe';

export function LocationInfo() {
  return (
    <div className="border-x border-gray-30 dark:border-gray-700 col-span-12 px-6 py-8">
      <div className="flex flex-wrap justify-between gap-6 md:gap-0">
        <div className="relative rounded-3xl border border-gray-30 dark:border-gray-700 h-[200px] w-full md:w-[49%] xl:w-[32%]">
          <Globe />
          <div className="absolute top-4 left-4 flex gap-2">
            <LocationIcon width={20} height={20} fill="var(--accent)" />
            <h4 className="mt-1 text-[12px] font-semibold text-gray-600">
              SCQ, Spain
            </h4>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-30 dark:border-gray-700 h-[200px] w-full md:w-[49%] xl:w-[32%]">
          2nd card
        </div>
        <div className="rounded-3xl border border-gray-30 dark:border-gray-700 h-[200px] md:mt-6 xl:mt-0 w-full xl:w-[32%] ">
          3rd card
        </div>
      </div>
    </div>
  );
}
