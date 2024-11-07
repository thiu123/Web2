import { createRouter, createWebHistory } from "vue-router";
import AllWords from "./views/AllWords.vue";
import EditWords from "./views/EditWords.vue";
import NewWords from "./views/NewWords.vue";
import ShowWords from "./views/ShowWords.vue";
import TestWords from "./views/TestWords.vue";

const routes = [
  {
    path: "/",
    redirect: "/all-words",
  },
  {
    path: "/all-words",
    component: AllWords,
  },
  {
    path: "/all-words/:id/edit-words",
    name: "edit",
    component: EditWords,
  },
  {
    path: "/all-words/new-words",
    component: NewWords,
  },
  {
    path: "/all-words/:id",
    name: "show",
    component: ShowWords,
  },
  {
    path: "/test-words",
    component: TestWords,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
