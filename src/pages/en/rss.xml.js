import rss from '@astrojs/rss';
import { getPosts, slugOf } from '../../lib/blog';

export async function GET(context) {
  const posts = await getPosts('en');
  return rss({
    title: 'Jimmy Chen — Blog',
    description: 'Writing on engineering practice, DevOps / SRE, and AI workflows.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/blog/${slugOf(post)}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
