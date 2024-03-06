import Link from 'next/link';

export default function CustomLink({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  return <Link href={`/blog/${slug}`}>{children}</Link>;
}
