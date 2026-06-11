<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import auto from "../data/projects.auto.json";
import manual from "../data/projects.manual.json";

const { lang } = useData();
const sep = computed(() => (lang.value === "en" ? " — " : "："));
const items = computed(() => [
  ...auto.map((p) => ({ ...p, live: true })),
  ...(manual[lang.value] || manual.zh || []),
]);
</script>

<template>
  <ul class="projects">
    <li v-for="(p, i) in items" :key="i" :class="{ live: p.live }">
      <strong>
        <a v-if="p.url" :href="p.url" target="_blank" rel="noopener">{{ p.name }}</a>
        <span v-else>{{ p.name }}</span>
      </strong>
      <span v-if="p.live" class="badge">Live</span>
      <template v-if="p.desc">{{ sep }}{{ p.desc }}</template>
      <a v-if="p.live && p.repo" :href="p.repo" class="repo" target="_blank" rel="noopener">repo&nbsp;↗</a>
      <a v-for="(l, li) in p.links" :key="li" :href="l.url" class="repo" target="_blank" rel="noopener">{{ l.label }}&nbsp;↗</a>
    </li>
  </ul>
</template>
