import VueRouter from "vue-router";
import Vue from "vue"

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/login"
        }, {
            path: "/login",
            name: "login",
            component: require("@/page/Login").default
        }
    ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("token") === null && to.name !== "login") {
        router.push({path: "/login"})
    } else {
        next()
    }
})

export default router