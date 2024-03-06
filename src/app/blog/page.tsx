import BlogContent from '@/components/blog-components/BlogContent';
import BlogHeader from '@/components/blog-components/BlogHeader';
import LangBanner from '@/components/blog-components/LangBanner';

export default function Blog() {
  return (
    <>
      <LangBanner />
      <div className="mx-5">
        <div className="container my-10 mx-auto xl:px-20 flex flex-col gap-5">
          <BlogHeader />
          <BlogContent />
        </div>
      </div>
    </>
  );
}
