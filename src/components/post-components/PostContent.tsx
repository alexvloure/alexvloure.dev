"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Note from "@/components/mdx-components/Note";
import Image from "next/image";

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
    <div className="prose mx-auto max-w-2xl dark:prose-invert">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
