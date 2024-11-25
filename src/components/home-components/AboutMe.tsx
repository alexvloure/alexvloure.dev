import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import { XIcon } from "../icons/XIcon";

export function AboutMe() {
  return (
    <div className="flex flex-col justify-between order-2 md:order-1 col-span-12 md:col-span-6 xl:col-span-4 border-x border-gray-30 dark:border-gray-700 px-6 py-8">
      <div className="flex flex-col mb-4 gap-4 overflow-hidden">
        <h4 className="leading-tight text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold">
          About me
        </h4>
        <p className="text-gray-600">
          With{" "}
          <a
            href="https://www.linkedin.com/in/alexvloure"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--foreground)] underline underline-offset-[3px] decoration-[var(--accent)]"
          >
            +3 years of experience
          </a>
          , I&apos;m a frontend developer who aims to create delightful and
          functional websites.
        </p>
        <p className="text-gray-600">
          Detail oriented and fast learner. Love to try out and experiment with
          new technologies and tools.
        </p>
        <p className="text-gray-600">
          I&apos;m currently studying a bachelor&apos;s degree in{" "}
          <a
            href="https://www.uoc.edu/en/studies/bachelors-degrees/bachelors-degree-software-development"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--foreground)] underline underline-offset-[3px] decoration-[var(--accent)]"
          >
            Computer Science at the UOC
          </a>
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 place-self-end">
        <p className="text-[12px] font-semibold">REACH ME AT</p>
        <div className="flex gap-2">
          <a
            href="mailto:alejandrovloure@gmail.com"
            aria-label="Send me an email"
            className="w-9 h-9 rounded-xl flex justify-center items-center border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer"
          >
            <MailIcon width={20} height={20} />
          </a>
          <a
            href="https://linkedin.com/in/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my LinkedIn profile"
            className="w-9 h-9 rounded-xl flex justify-center items-center border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer"
          >
            <LinkedInIcon width={20} height={20} />
          </a>
          <a
            href="https://github.com/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my GitHub profile"
            className="w-9 h-9 rounded-xl flex justify-center items-center border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer"
          >
            <GitHubIcon width={20} height={20} />
          </a>
          <a
            href="https://x.com/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my GitHub profile"
            className="w-9 h-9 rounded-xl flex justify-center items-center border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer"
          >
            <XIcon width={18} height={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
