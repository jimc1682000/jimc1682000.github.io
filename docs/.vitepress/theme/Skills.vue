<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import skillsData from "../data/skills.json";

const { frontmatter } = useData();
const variant = computed(() => frontmatter.value.variant || "ai");
const lang = computed(() => (frontmatter.value.lang === "en" ? "en" : "zh"));

const cfg = computed(() => {
  const v = skillsData[variant.value];
  return v?.[lang.value] || v?.zh || { categories: [] };
});

const sigLabel = computed(() => (lang.value === "en" ? "Core strengths" : "招牌能力"));

const icons = {
  ai: "M12 3a7 7 0 0 0-4 12.7V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.3A7 7 0 0 0 12 3Zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
  cloud: "M7 18a4 4 0 1 1 .2-8 5.5 5.5 0 0 1 10.6-1.2A4 4 0 1 1 17 18H7Z",
  cicd: "M4 7h6l2 2h8v10H4V7Zm4 6h4v2H8v-2Zm6 0h4v2h-4v-2Z",
  observe: "M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2.5a1 1 0 0 1 1 1V12l2.1 1.2a1 1 0 1 1-1 1.7L12 13.5V10.5a1 1 0 0 1 1-1Z",
  code: "M8 7 3 12l5 5M16 7l5 5-5 5M13 5l-2 14",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm16 4c0 1.7-3.6 3-8 3s-8-1.3-8-3v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4Zm0 6c0 1.7-3.6 3-8 3s-8-1.3-8-3v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4Z",
  container: "M5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Zm3 3v2h2v-2H8Zm4 0v2h2v-2h-2Z",
  message: "M4 6h16v9H7l-3 3V6Z",
  backend: "M4 5h16v3H4V5Zm0 6h10v3H4v-3Zm0 6h7v3H4v-3Z",
  security: "M12 3 5 6v6c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6l-7-3Zm0 4a3 3 0 0 1 3 3v1h-6V10a3 3 0 0 1 3-3Z",
  test: "M7 4h10v3H7V4Zm-1 5h12l-2 9H8L6 9Zm5 2v5h2v-5h-2Z",
  reliability: "M12 3 4 7v5c0 4.2 3.4 7.9 8 9 4.6-1.1 8-4.8 8-9V7l-8-4Zm-1 11-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z",
};

function iconPath(id) {
  return icons[id] || icons.cloud;
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const pri = (it) => (it.hl || it.badge ? 0 : 1);
    return pri(a) - pri(b);
  });
}

const categories = computed(() =>
  (cfg.value.categories || []).map((cat) => ({
    ...cat,
    items: sortItems(cat.items || []),
  }))
);
</script>

<template>
  <div class="skills-panel reveal" :class="{ compact: cfg.compact }">
    <p v-if="cfg.headline" class="skills-headline">{{ cfg.headline }}</p>

    <div v-if="cfg.signature?.length" class="skills-signature">
      <span class="sig-label">{{ sigLabel }}</span>
      <span v-for="(s, i) in cfg.signature" :key="i" class="sig-chip">{{ s }}</span>
    </div>

    <div class="skills-grid">
      <article
        v-for="cat in categories"
        :key="cat.id"
        class="skill-card"
        :class="{ hero: cat.hero }"
      >
        <header class="skill-card-head">
          <span class="skill-icon" :data-id="cat.id" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path :d="iconPath(cat.id)" /></svg>
          </span>
          <h3>{{ cat.title }}</h3>
        </header>
        <div class="skill-tags" aria-label="skill list">
          <span
            v-for="(item, i) in cat.items"
            :key="i"
            class="skill-tag"
            :class="{ 'is-key': item.hl }"
          >
            <span class="skill-name">{{ item.name }}</span>
            <span v-if="item.badge" class="skill-level">{{ item.badge }}</span>
          </span>
        </div>
      </article>
    </div>
  </div>
</template>