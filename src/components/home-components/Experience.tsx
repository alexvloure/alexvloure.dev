import { ExperienceItem } from "./ExperienceItem";

const experience = [
  {
    image: "/images/mca.webp",
    company: "MCA Groupe",
    position: "Frontend Engineer",
    date: "04/2024 - Present",
    highlights: [
      "Developed an app from scratch to streamline employee timetable management for store managers at a leading global clothing retailer.",
    ],
  },
  {
    image: "/images/deus.webp",
    company: "DEUS: human(ity)-centered AI",
    position: "Frontend Developer",
    date: "05/2022 - 04/2024",
    highlights: [
      "Collaborated in successfully launching a service to allow users easily extract info from multiple huge pdf documents by asking questions to them using AI.",
      "Improved maintainability of project by implementing TypeScript and testing with Jest and React Testing Library.",
    ],
  },
];

export function Experience() {
  return (
    <div className="order-3 col-span-12 xl:col-span-4 border-x border-t xl:border-r xl:border-l-0 xl:border-y-0 border-gray-30 dark:border-gray-700 px-6 py-8 bg-dotted-light dark:bg-dotted-dark">
      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <h4 className="uppercase text-[12px] font-semibold text-[var(--accent)]">
            most recent work experience
          </h4>
        </div>
        <div className="flex flex-col gap-6">
          {experience.map((item, index) => (
            <ExperienceItem
              key={item.company}
              image={item.image}
              company={item.company}
              position={item.position}
              date={item.date}
              highlights={item.highlights}
              isLastItem={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
