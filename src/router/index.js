import { createWebHistory, createRouter } from "vue-router";

import Register from "@/components/user/RegisterForm.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import HomePage from "@/views/home/HomePage.vue";

const routes = [
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/",
        name: "home",
        component: HomePage,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
    
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;