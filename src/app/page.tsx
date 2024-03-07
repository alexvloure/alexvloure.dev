import { AboutMe } from '@/components/home-components/AboutMe';
import { Experience } from '@/components/home-components/Experience';
import Header from '@/components/home-components/Header';
import { InfoPanel } from '@/components/home-components/InfoPanel';
import { Portrait } from '@/components/home-components/Portrait';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="border-b border-gray-30 dark:border-gray-700">
        <div className="mx-auto grid max-w-[90rem] grid-cols-12 px-2 xs:px-6 sm:px-10 xl:px-10">
          <AboutMe />
          <Portrait />
          <Experience />
        </div>
      </div>
      <div className="border-b border-gray-30 dark:border-gray-700">
        <div className="mx-auto grid max-w-[90rem] grid-cols-12 px-2 xs:px-6 sm:px-10 xl:px-10">
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}
