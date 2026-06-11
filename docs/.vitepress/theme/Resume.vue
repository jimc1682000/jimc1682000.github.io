<script setup>
import { useData, useRoute, Content } from "vitepress";
import { onMounted, onUnmounted, nextTick, ref, watch, computed } from "vue";

const { frontmatter } = useData();
const route = useRoute();

// Variant navigation (3 versions × 2 languages).
const VARIANTS = [
  { key: "ai", zh: "AI Engineer", en: "AI Engineer" },
  { key: "sre", zh: "SRE / DevOps", en: "SRE / DevOps" },
  { key: "platform", zh: "Platform Engineer", en: "Platform Engineer" },
  { key: "detail", zh: "完整詳細", en: "Full CV" },
];
const ROUTES = {
  ai: { zh: "/", en: "/en/" },
  sre: { zh: "/sre", en: "/en/sre" },
  detail: { zh: "/detail", en: "/en/detail" },
  platform: { zh: "/platform", en: "/en/platform" },
};
const curVariant = computed(() => frontmatter.value.variant || "ai");
const curLang = computed(() => (frontmatter.value.lang === "en" ? "en" : "zh"));
const variantHref = (key, l) => ROUTES[key]?.[l || curLang.value] ?? "#";
const brandLabel = computed(() =>
  curLang.value === "en" ? "陳建豪 Jimmy Chen Resume" : "陳建豪 Jimmy Chen 簡歷"
);

const theme = ref("light");
const scrolled = ref(false);
const cardEl = ref(null);
let io = null;
let cleanup = [];

function applyRoot() {
  if (typeof document === "undefined") return;
  const e = document.documentElement;
  e.setAttribute("data-theme", theme.value);
  e.setAttribute("data-mode", "rich");
}
function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  try { localStorage.setItem("resume.theme", theme.value); } catch (_) {}
  applyRoot();
}
function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// "Title @@ Date" -> title + right-aligned date; then group each h3 + its <ul> into a .job card.
function decorate() {
  document.querySelectorAll(".resume-body h3").forEach((h) => {
    if (h.closest(".skills-panel") || h.closest(".skill-card")) return;
    if (!h.dataset.done) {
      const i = h.textContent.indexOf(" @@ ");
      if (i > -1) {
        const date = h.textContent.slice(i + 4);
        h.textContent = h.textContent.slice(0, i);
        const span = document.createElement("span");
        span.className = "date";
        span.textContent = date;
        h.appendChild(span);
      }
      h.dataset.done = "1";
    }
    if (!h.parentElement.classList.contains("job")) {
      const ul = h.nextElementSibling;
      const wrap = document.createElement("div");
      wrap.className = "job";
      h.parentNode.insertBefore(wrap, h);
      wrap.appendChild(h);
      if (ul && ul.tagName === "UL") wrap.appendChild(ul);
    }
  });
}

function reveal() {
  const els = document.querySelectorAll(
    ".resume .rh, .resume .summary, .resume-body h2, .resume-body .skills-panel, .resume-body .job"
  );
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--d", (i % 7) * 45 + "ms");
    io.observe(el);
  });
}

function refresh() { nextTick(() => { decorate(); reveal(); }); }

onMounted(() => {
  const e = document.documentElement;
  theme.value = e.getAttribute("data-theme") || "light";
  applyRoot();
  refresh();

  const onScroll = () => { scrolled.value = window.scrollY > 8; };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  cleanup.push(() => window.removeEventListener("scroll", onScroll));

  // Cursor spotlight (CSS gates it to rich mode).
  const card = cardEl.value;
  if (card) {
    const onMove = (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ev.clientX - r.left + "px");
      card.style.setProperty("--my", ev.clientY - r.top + "px");
    };
    card.addEventListener("pointermove", onMove);
    cleanup.push(() => card.removeEventListener("pointermove", onMove));
  }
});

watch(() => route.path, () => refresh());
onUnmounted(() => { if (io) io.disconnect(); cleanup.forEach((fn) => fn()); cleanup = []; });
</script>

<template>
  <div class="resume-shell">
    <div class="aurora" aria-hidden="true"></div>

    <nav class="toolbar" :class="{ scrolled }">
      <button class="brand" type="button" @click="scrollTop" :aria-label="curLang === 'en' ? 'Back to top' : '回到頂端'" title="Top">
        <span class="brand-text">
          <span class="brand-base">{{ brandLabel }}</span>
          <span class="brand-fill" aria-hidden="true">{{ brandLabel }}</span>
        </span>
      </button>
      <div class="ctrls">
        <div class="seg variant">
          <a v-for="v in VARIANTS" :key="v.key" :href="variantHref(v.key)" :class="{ active: v.key === curVariant }">{{ curLang === "en" ? v.en : v.zh }}</a>
        </div>
        <div class="seg">
          <a :href="variantHref(curVariant, curLang === 'en' ? 'zh' : 'en')">{{ curLang === "en" ? "中文" : "EN" }}</a>
        </div>
        <button class="icon" @click="toggleTheme" :aria-label="theme === 'dark' ? 'switch to light' : 'switch to dark'" :title="theme === 'dark' ? 'Light' : 'Dark'">
          <svg v-if="theme === 'dark'" class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
          <svg v-else class="ti" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        </button>
        <a class="dl" :href="frontmatter.pdf" download>⬇︎&nbsp;{{ curLang === "en" ? "PDF" : "下載 PDF" }}</a>
      </div>
    </nav>

    <main class="resume" ref="cardEl">
      <div class="spotlight" aria-hidden="true"></div>
      <header class="rh">
        <h1>{{ frontmatter.name }} <span class="en">{{ frontmatter.nameEn }}</span></h1>
        <p class="role">{{ frontmatter.role }}</p>
        <p class="contact">
          <template v-for="(c, i) in frontmatter.contacts" :key="i">
            <a v-if="c.href" :href="c.href" :target="c.href.startsWith('mailto') ? null : '_blank'" rel="noopener" class="contact-icon" :aria-label="c.text" :title="c.text">
              <!-- email -->
              <svg v-if="c.href.startsWith('mailto')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <!-- github -->
              <svg v-else-if="c.href.includes('github')" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <!-- linkedin -->
              <svg v-else-if="c.href.includes('linkedin')" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <!-- fallback: show text -->
              <span v-else>{{ c.text }}</span>
            </a>
            <span v-else>{{ c.text }}</span>
            <span v-if="i < frontmatter.contacts.length - 1" class="sep">·</span>
          </template>
        </p>
        <blockquote class="summary">{{ frontmatter.summary }}</blockquote>
      </header>

      <div class="resume-body">
        <Content />
      </div>
    </main>

    <footer class="foot">
      <a :href="frontmatter.pdf" download>{{ curLang === "en" ? "Download PDF" : "下載 PDF" }}</a>
      <span class="sep">·</span>
      <a href="https://github.com/jimc1682000" target="_blank" rel="noopener">GitHub</a>
    </footer>
  </div>
</template>
