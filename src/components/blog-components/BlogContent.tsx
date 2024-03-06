import { getPosts } from '@/utils/getPost';
import BlogPostPreview from './BlogPostPreview';

export default async function BlogContent() {
  const posts = await getPosts();
  const articlesText =
    posts.length === 1 ? `${posts.length} article` : `${posts.length} articles`;

  return (
    <div className="w-full">
      <h2 className="font-bold text-base sm:text-lg md:text-xl mb-4 pl-6 lg:pl-10">
        Latest posts ({articlesText})
      </h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
        {posts.map((post) => (
          <BlogPostPreview key={post.slug} slug={post.slug} />
        ))}
      </div>
    </div>
  );
}
