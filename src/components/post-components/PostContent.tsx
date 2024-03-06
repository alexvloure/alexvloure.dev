'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Note from '@/components/mdx-components/Note';
import Image from 'next/image';

const components = {
  Note,
  Image,
};

export default function BlogPostContent({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return (
    <div className="max-w-2xl mx-auto prose dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
