import { AboutMe } from "@/components/home/AboutMe";
import { Experience } from "@/components/home/Experience";
import Header from "@/components/home/Header";
import { InfoPanel } from "@/components/home/InfoPanel";
import { Portrait } from "@/components/home/Portrait";
import { MiniTools } from "@/components/home/MiniTools";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="border-gray-30 border-b dark:border-gray-700">
        <div className="xs:px-6 mx-auto grid max-w-[90rem] grid-cols-12 px-2 sm:px-10 xl:px-10">
          <AboutMe />
          <Portrait />
          <Experience />
        </div>
      </div>
      <div className="border-gray-30 border-b dark:border-gray-700">
        <div className="xs:px-6 mx-auto grid max-w-[90rem] grid-cols-12 px-2 sm:px-10 xl:px-10">
          <InfoPanel />
        </div>
      </div>
      <div className="border-gray-30 border-b dark:border-gray-700">
        <div className="xs:px-6 mx-auto grid max-w-[90rem] grid-cols-12 px-2 sm:px-10 xl:px-10">
          <MiniTools />
        </div>
      </div>
    </div>
  );
}
