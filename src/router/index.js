import { nextTick } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import item from "../views/item.vue";
// import firebase from "@/firebase/firebase";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
    meta: { requireAuth: true },
  },
  // {
  //   path: '/item/:id',
  //   name: 'item',
  //   component: item
  // },

  {
    path: "/cart",
    name: "cart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/cart.vue"),
    meta: { title: "ショッピングカート" },
    meta: { requireAuth: true },
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/order",
    name: "order",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/item/:id",
    name: "item",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: item,
    // props:route => ({
    //   id:Number(route.params.name),
    //   name:route.params.name,
    //   // description:route.params.description,
    //   // iamgePath:route.params.iamgePath,
    //   // price:route.params.price
    // })
    meta: { requireAuth: true },
  },
  {
    path: "/Thankyou",
    name: "Thankyou",
    component: () => import("../views/Thankyou.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignUp.vue"),
    meta: { requireAuth: true },
  },

];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requireAuth) {
    const user = sessionStorage.getItem("user");
    console.log("できてなさそう", JSON.parseuser);
    if (!user) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) {
    //     next({
    //       path: "/login",
    //       query: { redirect: to.fullPath },
    //     });
    //   } else {
    //     next();
    //   }
    // });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;

const DEFAULT_TITLE = "Football MyTeam";
