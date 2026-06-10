import { defineConfig } from "vitepress";

// User-pages site served from the domain root.
export default defineConfig({
  title: "Jimmy Chen",
  description: "陳建豪 Jimmy Chen — DevOps / SRE / AI Engineer",
  lang: "zh-Hant",
  base: "/",
  cleanUrls: true,
  appearance: false,
  metaChunk: true,
  head: [
    ["meta", { name: "robots", content: "index,follow" }],
    ["meta", { property: "og:title", content: "陳建豪 Jimmy Chen — DevOps / SRE / AI Engineer" }],
    ["meta", { property: "og:type", content: "profile" }],
  ],
});
