const main = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/Main",
    name: "Main",
    component: () => import("@/views/Main.vue"),
  },
];

export default main;
