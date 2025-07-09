import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export default function PostHeader({ title }: { title: string }) {
  return (
    <div
      className="relative flex min-h-[150px] w-full flex-col items-center justify-between gap-5
        overflow-hidden"
    >
      <Link
        className="flex cursor-pointer items-center self-start"
        href={"/blog"}
      >
        <IoMdArrowBack className="mr-3 text-lg md:mr-5 md:text-3xl" />
        <h2 className="text-lg font-bold md:text-3xl">blog</h2>
      </Link>
      <div className="flex items-center">
        <h1
          className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
            from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-bold
            !leading-normal text-transparent
            dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
            dark:from-amber-200 dark:via-violet-600 dark:to-sky-900 md:text-5xl"
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
