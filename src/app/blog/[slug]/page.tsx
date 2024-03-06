import PostContent from '@/components/post-components/PostContent';
import PostHeader from '@/components/post-components/PostHeader';
import { getPost } from '@/utils/getPost';

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="mx-5">
      <div className="container my-10 mx-auto xl:px-20 flex flex-col gap-5">
        <PostHeader title={post.frontmatter.title} />
        <PostContent source={post.mdxSerialized} />
      </div>
    </div>
  );
}
