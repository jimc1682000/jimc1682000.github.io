<script setup>
import { useData, useRoute, Content } from "vitepress";
import { onMounted, nextTick, watch } from "vue";

const { frontmatter, lang } = useData();
const route = useRoute();

// Turn "Title @@ Date" headings into title + right-aligned date (mirrors the PDF).
function decorate() {
  document.querySelectorAll(".resume-body h3").forEach((h) => {
    if (h.dataset.done) return;
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
  });
}

onMounted(() => nextTick(decorate));
watch(() => route.path, () => nextTick(decorate));
</script>

<template>
  <div class="resume-shell">
    <nav class="toolbar">
      <span class="brand">{{ frontmatter.name }} <em>{{ frontmatter.nameEn }}</em></span>
      <div class="ctrls">
        <a v-if="frontmatter.otherVariant" class="seg" :href="frontmatter.otherVariant">{{ frontmatter.otherVariantLabel }}</a>
        <a v-if="frontmatter.otherLang" class="seg" :href="frontmatter.otherLang">{{ frontmatter.otherLangLabel }}</a>
        <a class="dl" :href="frontmatter.pdf" download>⬇︎&nbsp;{{ lang === "en" ? "Download PDF" : "下載 PDF" }}</a>
      </div>
    </nav>

    <main class="resume">
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
