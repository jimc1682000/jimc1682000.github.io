import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content Layer glob loader：載入 repo 根的 content/blog/**/*.md。
// generateId 保留目錄結構（去副檔名），例：
//   2026/hello-site.md    → id "2026/hello-site"
//   en/2026/foo.md        → id "en/2026/foo"
// locale / slug 由 id 於 src/lib/blog.ts 推導。
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      locale: z.enum(['zh', 'en']).optional(),
      translationOf: z.string().optional(),
      cover: image().optional(),
    }),
});

export const collections = { blog };
