---
title: "Hello — the New Site Is Live"
pubDate: 2026-07-24
description: "The first post after migrating my personal site from VitePress to Astro 5: the architecture, the routing, and how posts get published."
tags:
  - meta
  - astro
locale: en
translationOf: hello-site
aiTranslated: true
---

This is the first post on the new site, meant to shake out the skeleton: heading levels, code blocks, links, and tags all get a run-through here.

## Why I moved to Astro

The old site ran on VitePress, which is great for documentation but a poor fit for the shape I wanted — a brand landing page plus a blog plus a set of bolted-on sub-sites. Astro 5's Content Layer makes content sources far more flexible, and the SSG output is clean.

### A few highlights

- Traditional Chinese at the bare root, English under an `/en/` prefix (the A1 routing scheme).
- Light and dark modes, manual toggle, no flash on first paint.
- Colors and spacing all go through the tokens in `DESIGN.md` — no magic hex scattered around.

## What publishing looks like

Posts live at `content/blog/YYYY/<slug>.md`, and the frontmatter needs at least `title`, `pubDate`, and `description`:

```yaml
---
title: Title
pubDate: 2026-07-24
description: A one-line description
tags:
  - example
---
```

The body supports standard Markdown, including inline `code` and blocks:

```ts
export function slugOf(id: string): string {
  return id.split('/').pop() ?? id;
}
```

## What's next

Down the road I'll gradually import the [old posts from Blogger](https://jimmychen.pages.dev/) and add links to my résumé and the film-brain sub-site. First, let's get the skeleton standing solid.
