// router/index.ts 文件

import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'
//由于router的API默认使用了类型进行初始化，内部包含类型定义，所以本文内部代码中的所有数据类型是可以省略的
//RouterRecordRaw是路由组件对象
const routes: RouteRecordRaw[] = [
    {
      path: "/",
      // 重定向到首页
      component: () => import("@/views/main/index.vue"),
      redirect: "home",
      children:[
        {
          path: "/home",
          name: "首页",
          component: () => import("@/views/main/home/index.vue"),
          meta: {
            isMenu: true,
            icon: "House",
            title: "首页"
          }
        },
        {
          path: "/people",
          name: "人员管理",
          component: () => import("@/views/main/home/index.vue"),
          meta: {
            isMenu: true,
            icon: "User",
            title: "人员管理"
          }
        },
        {
          path: "/product",
          name: "产品管理",
          component: () => import("@/views/main/home/index.vue"),
          meta: {
            isMenu: true,
            icon: "Handbag",
            title: "产品管理"
          }
        },
        {
          path: "/mutil-menu",
          name: "多级菜单",
          redirect: "mutil-menu/one",
          children: [
            {
              path: "one",
              name: "二级菜单1",
              component: () => import("@/views/main/home/index.vue"),
              meta: {
                title: "二级菜单1"
              }
            },
            {
              path: "two",
              name: "二级菜单2",
              component: () => import("@/views/main/home/index.vue"),
              meta: {
                title: "二级菜单2"
              }
            }
          ],
          meta:{
            isMenu: true,
            icon: "More"
          }
        },
      ]
    },
    {
      path: "/login",
      component: () => import("@/views/not-found/index.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/not-found/index.vue"),
      meta: {
        title: "404"
      }
    }
]

// RouterOptions是路由选项类型
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
}

// Router是路由对象类型
const router: Router = createRouter(options)

router.beforeEach((to) => {
  // 更新网页标题
  document.title = `R-admin-${ to.meta.title}`
})

export default router
