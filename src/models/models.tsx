import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Frontmatter = {
  title: string;
  publishedDate: string;
  lastUpdatedDate: string;
  tags: string[];
  description: string;
  status: string;
};

export type Post<TFrontmatter> = {
  slug: string;
  mdxSerialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};