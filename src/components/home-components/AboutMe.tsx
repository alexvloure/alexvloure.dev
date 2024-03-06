import { IconSlider } from '../IconSlider';
import { CypressIcon } from '../icons/CypressIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { GoIcon } from '../icons/GoIcon';
import { JestIcon } from '../icons/JestIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { MailIcon } from '../icons/MailIcon';
import { NextjsIcon } from '../icons/Nextjs';
import { ReactIcon } from '../icons/ReactIcon';
import { ReactQueryIcon } from '../icons/ReactQueryIcon';
import { TailwindCSSIcon } from '../icons/TailwindCSSIcon';
import { TestingLibraryIcon } from '../icons/TestingLibraryIcon';
import { TypeScriptIcon } from '../icons/TypeScript';
import { ViteIcon } from '../icons/ViteIcon';

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

export function AboutMe() {
  return (
    <div className="flex flex-col justify-between order-2 md:order-1 col-span-12 md:col-span-6 xl:col-span-4 border-x border-gray-30 dark:border-gray-700 px-6 py-8">
      <div className="flex flex-col mb-4 gap-4 overflow-hidden">
        <h4 className="leading-tight text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold">
          About me
        </h4>
        <p className="text-gray-600">
          With over{' '}
          <a
            href="https://www.linkedin.com/in/alexvloure"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--foreground)] underline underline-offset-2 decoration-[var(--accent)]">
            2 years of experience
          </a>
          , I&apos;m a frontend developer who aims to create delightful and
          functional websites.
        </p>
        <p className="text-gray-600">
          Detail oriented and fast learner. Love to try out and experiment with
          new technologies and tools.
        </p>
        <div>
          <p className="text-gray-600">Tech stack I usually work with: </p>
          <IconSlider icons={LOGOS} />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 place-self-end">
        <p className="text-[12px] font-semibold">REACH ME AT</p>
        <div className="flex gap-2">
          <a
            href="mailto:alejandrovloure@gmail.com"
            className="p-2 rounded-xl border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer">
            <MailIcon width={20} height={20} />
          </a>
          <a
            href="https://linkedin.com/in/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer">
            <LinkedInIcon width={20} height={20} />
          </a>
          <a
            href="https://github.com/alexvloure"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl border border-gray-30 dark:border-gray-700 hover:border-[var(--accent)] dark:hover:border-[var(--accent)] fill-gray-600 hover:fill-[var(--accent)] transition-all duration-300 cursor-pointer">
            <GitHubIcon width={20} height={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
