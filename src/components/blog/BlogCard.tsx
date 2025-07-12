import Link from "next/link";

export default function BlogCard() {
  return (
    <Link href={"/blog"}>
      <div
        className="relative col-span-1 flex aspect-square flex-col items-center justify-center
          overflow-hidden rounded-3xl bg-[#F5F5F7] shadow-sm transition duration-300
          ease-in-out dark:bg-[#010101]"
      >
        <h1
          className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
            from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl font-bold
            text-transparent dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
            dark:from-amber-200 dark:via-violet-600 dark:to-sky-900 md:text-5xl lg:text-7xl"
        >
          BLOG
        </h1>
      </div>
    </Link>
  );
}
