import rss from '@astrojs/rss';
import { getPosts, slugOf } from '../lib/blog';

export async function GET(context) {
  const posts = await getPosts('zh');
  return rss({
    title: '陳建豪 Jimmy Chen — Blog',
    description: '工程實踐、DevOps／SRE 與 AI 工作流的文章。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${slugOf(post)}/`,
      categories: post.data.tags,
    })),
    customData: '<language>zh-Hant</language>',
  });
}
