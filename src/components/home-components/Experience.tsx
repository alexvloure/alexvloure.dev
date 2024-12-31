import { ExperienceItem } from "./ExperienceItem";

const experience = [
  {
    image: "/images/mca.webp",
    company: "MCA Groupe",
    position: "Frontend Engineer",
    date: "04/2024 - Present",
    highlights: [
      "Developed a web app for one of the largest clothing retail companies, enabling store managers to manage timetables for their employees, track absences, and modify employee contracts.",
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
    <div
      className="border-gray-30 order-3 col-span-12 border-x border-t bg-dotted-light px-6 py-8
        dark:border-gray-700 dark:bg-dotted-dark xl:col-span-4 xl:border-y-0
        xl:border-l-0 xl:border-r"
    >
      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <h4 className="text-[12px] font-semibold uppercase text-[var(--accent)]">
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
