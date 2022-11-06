import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

console.log(`import.meta.env.BASE_URL: ${import.meta.env.BASE_URL}`);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/lpvp",
      name: "lpvp",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LpVpView.vue"),
    },
    {
      path: "/balance-checker",
      name: "balance-checker",
      component: () => import("../views/BalanceChecker.vue"),
    },
  ],
});

export default router;
