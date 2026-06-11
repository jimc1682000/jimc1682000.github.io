import Resume from "./Resume.vue";
import Projects from "./Projects.vue";
import Skills from "./Skills.vue";
import "./resume.css";

// Fully custom theme: every page uses the résumé layout.
export default {
  Layout: Resume,
  enhanceApp({ app }) {
    app.component("Projects", Projects);
    app.component("Skills", Skills);
  },
};
