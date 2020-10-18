import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/bookmark-list",
    name: "BookMarkList",
    component: () => import("@/views/bookmark-list/BookMarkList.vue"),
  },
  {
    path: "/bookmark-editor",
    name: "BookMarkEditor",
    component: () => import("@/views/bookmark-editor/BookMarkEditor.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
