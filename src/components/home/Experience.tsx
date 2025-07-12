import { ExperienceItem } from "./ExperienceItem";

const experience = [
  {
    image: "/images/kelea.svg",
    company: "Kelea",
    position: "Senior Frontend Engineer",
    date: "03/2025 - Present",
    highlights: [
      "Now under the Kelea umbrella, I continue to work on the same project. Also, we're reaching production with a new product that allows employees to view their daily plans, register clockings or record absences, among other features.",
    ],
  },
  {
    image: "/images/mca.webp",
    company: "MCA Groupe",
    position: "Frontend Engineer",
    date: "04/2024 - 03/2025",
    highlights: [
      "Developed a web app for one of the largest clothing retail companies, enabling store managers to manage timetables for their employees, track absences, and modify employee contracts.",
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
