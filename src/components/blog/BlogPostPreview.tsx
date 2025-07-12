import { getPost } from "@/utils/getPost";
import { format } from "date-fns";
import { BsCalendar3 } from "react-icons/bs";
import { MdOutlineArrowForward } from "react-icons/md";
import CustomLink from "../CustomLink";

type BlogPostPreviewProps = {
  slug: string;
};

export default async function BlogPostPreview(props: BlogPostPreviewProps) {
  const post = await getPost(props.slug);
  const publishedDate = new Date(post.frontmatter.publishedDate);
  const dateFormatted = format(publishedDate, "MMMM dd, yyyy");

  return (
    <div
      className="group flex min-h-[200px] w-full cursor-pointer flex-col items-start
        justify-start rounded-3xl bg-[#F5F5F7] p-6 dark:bg-[#010101] lg:min-h-[225px]
        lg:p-10"
    >
      <CustomLink slug={props.slug}>
        <div>
          <h1
            className="text-lg font-semibold
              group-hover:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
              group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500
              group-hover:bg-clip-text group-hover:text-transparent
              group-hover:dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]
              group-hover:dark:from-amber-200 group-hover:dark:via-violet-600
              group-hover:dark:to-sky-900 md:text-xl"
          >
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center gap-2">
            <BsCalendar3 />
            <span>{dateFormatted}</span>
          </div>
        </div>
        <p className="py-4">{post.frontmatter.description}</p>
        <div className="flex items-center">
          <span className="font-medium">Read more</span>
          <MdOutlineArrowForward
            className="h-5 w-5 opacity-0 transition-all group-hover:ml-2 group-hover:fill-red-500
              group-hover:opacity-100 group-hover:dark:fill-violet-500"
          />
        </div>
      </CustomLink>
    </div>
  );
}
