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
    ["meta", { name: "robots", content: "noindex,nofollow" }],
    ["meta", { property: "og:title", content: "陳建豪 Jimmy Chen — DevOps / SRE / AI Engineer" }],
    ["meta", { property: "og:type", content: "profile" }],
    // Apply saved theme/mode before first paint to avoid a flash.
    [
      "script",
      {},
      "(function(){try{var e=document.documentElement;var q=new URLSearchParams(location.search);e.setAttribute('data-theme',q.get('theme')||localStorage.getItem('resume.theme')||'light');e.setAttribute('data-mode',q.get('mode')||localStorage.getItem('resume.mode')||'minimal');}catch(_){}})();",
    ],
  ],
});
