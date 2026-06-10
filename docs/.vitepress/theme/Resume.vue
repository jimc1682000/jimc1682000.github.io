<script setup>
import { useData, useRoute, Content } from "vitepress";
import { onMounted, onUnmounted, nextTick, ref, watch } from "vue";

const { frontmatter, lang } = useData();
const route = useRoute();

const theme = ref("light");
const mode = ref("minimal");
const scrolled = ref(false);
const cardEl = ref(null);
let io = null;
let cleanup = [];

function applyRoot() {
  if (typeof document === "undefined") return;
  const e = document.documentElement;
  e.setAttribute("data-theme", theme.value);
  e.setAttribute("data-mode", mode.value);
}
function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  try { localStorage.setItem("resume.theme", theme.value); } catch (_) {}
  applyRoot();
}
function setMode(m) {
  mode.value = m;
  try { localStorage.setItem("resume.mode", m); } catch (_) {}
  applyRoot();
}

// "Title @@ Date" -> title + right-aligned date; then group each h3 + its <ul> into a .job card.
function decorate() {
  document.querySelectorAll(".resume-body h3").forEach((h) => {
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
    ".resume .rh, .resume .summary, .resume-body > h2, .resume-body > ul, .resume-body > .job, .resume-body > p"
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
  mode.value = e.getAttribute("data-mode") || "minimal";
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
      <span class="brand">{{ frontmatter.name }} <em>{{ frontmatter.nameEn }}</em></span>
      <div class="ctrls">
        <div class="seg">
          <a v-if="frontmatter.otherVariant" :href="frontmatter.otherVariant">{{ frontmatter.otherVariantLabel }}</a>
        </div>
        <div class="seg">
          <a v-if="frontmatter.otherLang" :href="frontmatter.otherLang">{{ frontmatter.otherLangLabel }}</a>
        </div>
        <div class="seg pills">
          <button :class="{ active: mode === 'minimal' }" @click="setMode('minimal')">{{ lang === "en" ? "Minimal" : "極簡" }}</button>
          <button :class="{ active: mode === 'rich' }" @click="setMode('rich')">{{ lang === "en" ? "Rich" : "豐富" }}</button>
        </div>
        <button class="icon" @click="toggleTheme" :aria-label="theme === 'dark' ? 'switch to light' : 'switch to dark'" :title="theme === 'dark' ? 'Light' : 'Dark'">
          <span v-if="theme === 'dark'">☀</span><span v-else>🌙</span>
        </button>
        <a class="dl" :href="frontmatter.pdf" download>⬇︎&nbsp;{{ lang === "en" ? "PDF" : "下載 PDF" }}</a>
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
      <a :href="frontmatter.pdf" download>{{ lang === "en" ? "Download PDF" : "下載 PDF" }}</a>
      <span class="sep">·</span>
      <a href="https://github.com/jimc1682000" target="_blank" rel="noopener">GitHub</a>
    </footer>
  </div>
</template>
