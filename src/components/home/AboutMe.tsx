import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import { XIcon } from "../icons/XIcon";

export function AboutMe() {
  return (
    <div
      className="border-gray-30 order-2 col-span-12 flex flex-col justify-between border-x px-6
        py-8 dark:border-gray-700 md:order-1 md:col-span-6 xl:col-span-4"
    >
      <div className="mb-4 flex flex-col gap-4 overflow-hidden">
        <h4 className="text-2xl font-semibold leading-tight md:text-2xl lg:text-3xl xl:text-5xl">
          About me
        </h4>
        <p className="text-gray-600">
          With{" "}
          <a
            href="https://www.linkedin.com/in/alexvloure"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--foreground)] underline decoration-[var(--accent)]
              underline-offset-[3px]"
          >
            5 years of experience
          </a>
          &nbsp;building scalable solutions, I&apos;m a frontend developer who
          aims to create delightful and functional websites.
        </p>
        <p className="text-gray-600">
          Detail oriented and with a product-centric mindest. Love to try out
          and experiment with new technologies and tools.
        </p>
        <p className="text-gray-600">
          I&apos;m currently studying a bachelor&apos;s degree in{" "}
          <a
            href="https://www.uoc.edu/en/studies/bachelors-degrees/bachelors-degree-software-development"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--foreground)] underline decoration-[var(--accent)]
              underline-offset-[3px]"
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
            className="border-gray-30 flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-xl border fill-gray-600 transition-all duration-300
              hover:border-[var(--accent)] hover:fill-[var(--accent)] dark:border-gray-700
              dark:hover:border-[var(--accent)]"
          >
            <MailIcon width={20} height={20} />
          </a>
          <a
            href="https://linkedin.com/in/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my LinkedIn profile"
            className="border-gray-30 flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-xl border fill-gray-600 transition-all duration-300
              hover:border-[var(--accent)] hover:fill-[var(--accent)] dark:border-gray-700
              dark:hover:border-[var(--accent)]"
          >
            <LinkedInIcon width={20} height={20} />
          </a>
          <a
            href="https://github.com/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my GitHub profile"
            className="border-gray-30 flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-xl border fill-gray-600 transition-all duration-300
              hover:border-[var(--accent)] hover:fill-[var(--accent)] dark:border-gray-700
              dark:hover:border-[var(--accent)]"
          >
            <GitHubIcon width={20} height={20} />
          </a>
          <a
            href="https://x.com/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Go to my GitHub profile"
            className="border-gray-30 flex h-9 w-9 cursor-pointer items-center justify-center
              rounded-xl border fill-gray-600 transition-all duration-300
              hover:border-[var(--accent)] hover:fill-[var(--accent)] dark:border-gray-700
              dark:hover:border-[var(--accent)]"
          >
            <XIcon width={18} height={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
