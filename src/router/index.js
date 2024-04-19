import { createWebHistory, createRouter } from "vue-router";

import Register from "@/views/user/RegisterPage.vue";
import LoginPage from "@/views/user/LoginPage.vue";
import Home from "@/views/home/HomePage.vue";
import ProductPage from "@/views/product/ProductPage.vue";
import CartPage from "@/views/cart/CartPage.vue";
import OrderPage from "@/views/order/OrderPage.vue";

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
        component: Home,
    },
    {
        path: "/product/:id",
        name: "product",
        component: ProductPage,
        props: true
    },
    {
        path: "/cart/:id",
        name: "cart",
        component: CartPage,
        props: true
    },
    {
        path: "/order/:id",
        name: "order",
        component: OrderPage,
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;