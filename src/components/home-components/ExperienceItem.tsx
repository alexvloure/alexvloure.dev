import Image from 'next/image';

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
      <div className="flex gap-2 items-center">
        <div className="flex items-center min-w-[56px] min-h-[56px] rounded-lg bg-zinc-800">
          <Image
            src={image}
            width={56}
            height={56}
            alt="company logo"
            className="filter brightness-0 invert px-1"
          />
        </div>
        <div className="w-full">
          <p>{company}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm leading-tight">{position}</p>
            <p className="text-gray-600 text-xs leading-tight text-right">
              {date}
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`mx-7 border-gray-30 dark:border-gray-700 ${
            isLastItem ? '' : 'border-r'
          }`}
        />
        <div className="flex flex-col gap-2">
          {highlights.map((highlight, index) => (
            <p key={index} className="text-xs text-gray-600">
              {' '}
              • {highlight}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
