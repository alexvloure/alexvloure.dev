import { getPost } from '@/utils/getPost';
import { format } from 'date-fns';
import { BsCalendar3 } from 'react-icons/bs';
import { MdOutlineArrowForward } from 'react-icons/md';
import CustomLink from '../CustomLink';

type BlogPostPreviewProps = {
  slug: string;
};

export default async function BlogPostPreview(props: BlogPostPreviewProps) {
  const post = await getPost(props.slug);
  const publishedDate = new Date(post.frontmatter.publishedDate);
  const dateFormatted = format(publishedDate, 'MMMM dd, yyyy');

  return (
    <div className="group w-full min-h-[200px] lg:min-h-[225px] p-6 lg:p-10 bg-[#F5F5F7] dark:bg-[#010101] flex flex-col justify-start items-start rounded-3xl cursor-pointer">
      <CustomLink slug={props.slug}>
        <div>
          <h1 className="font-semibold text-lg md:text-xl group-hover:bg-clip-text group-hover:text-transparent group-hover:dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] group-hover:dark:from-amber-200 group-hover:dark:via-violet-600 group-hover:dark:to-sky-900 group-hover:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-yellow-500">
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
          <MdOutlineArrowForward className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:ml-2 group-hover:fill-red-500 group-hover:dark:fill-violet-500" />
        </div>
      </CustomLink>
    </div>
  );
}
