import Image from "next/image";

type ExperienceItemProps = {
  image: string;
  company: string;
  position: string;
  date: string;
  highlights: string[];
  isLastItem?: boolean;
};

export function ExperienceItem({
  image,
  company,
  position,
  date,
  highlights,
  isLastItem,
}: ExperienceItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex min-h-[56px] min-w-[56px] items-center rounded-[0.5rem] bg-zinc-800">
          <Image
            src={image}
            loading="eager"
            width={56}
            height={56}
            alt="company logo"
            className="px-1 brightness-0 invert filter"
          />
        </div>
        <div className="w-full">
          <p>{company}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-tight text-gray-600">{position}</p>
            <p className="text-right text-xs leading-tight text-gray-600">
              {date}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`border-gray-30 mx-7 dark:border-gray-700 ${isLastItem ? "" : "border-r"}`}
        />
        <div className="flex flex-col gap-2">
          {highlights.map((highlight, index) => (
            <p key={index} className="text-[13px] text-gray-600">
              {" "}
              • {highlight}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
