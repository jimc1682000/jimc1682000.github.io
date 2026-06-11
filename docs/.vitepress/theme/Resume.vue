<script setup>
import { useData, useRoute, Content } from "vitepress";
import { onMounted, onUnmounted, nextTick, ref, watch, computed } from "vue";

const { frontmatter } = useData();
const route = useRoute();

// Variant navigation (3 versions × 2 languages).
const VARIANTS = [
  { key: "ai", zh: "AI Engineer", en: "AI Engineer" },
  { key: "sre", zh: "SRE / DevOps", en: "SRE / DevOps" },
  { key: "detail", zh: "完整詳細", en: "Full CV" },
];
const ROUTES = {
  ai: { zh: "/", en: "/en/" },
  sre: { zh: "/sre", en: "/en/sre" },
  detail: { zh: "/detail", en: "/en/detail" },
};
const curVariant = computed(() => frontmatter.value.variant || "ai");
const curLang = computed(() => (frontmatter.value.lang === "en" ? "en" : "zh"));
const variantHref = (key, l) => ROUTES[key][l || curLang.value];
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
            <a v-if="c.href" :href="c.href" :target="c.href.startsWith('mailto') ? null : '_blank'" rel="noopener">{{ c.text }}</a>
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
