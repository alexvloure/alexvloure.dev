import Link from 'next/link';

export default function BlogCard() {
  return (
    <Link href={'/blog'}>
      <div className="flex flex-col justify-center items-center bg-[#F5F5F7] dark:bg-[#010101] rounded-3xl relative overflow-hidden col-span-1 aspect-square shadow-sm transition duration-300 ease-in-out">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] dark:from-amber-200 dark:via-violet-600 dark:to-sky-900 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500">
          BLOG
        </h1>
      </div>
    </Link>
  );
}
