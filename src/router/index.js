import { createRouter, createWebHistory } from "vue-router";

const modules = import.meta.glob("./*.js", {
  eager: true,
  import: "default",
});

const router = createRouter({
  history: createWebHistory("/SIGNooo"),
  routes: [
    ...Object.values(modules)
      .flat()
      .sort((a, b) => (a.path > b.path ? 1 : -1)),
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
