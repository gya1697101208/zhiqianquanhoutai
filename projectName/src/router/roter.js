import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/api/userlogin',
    name:'userlogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/userlogin.vue')
  },
    {
      path:'/api/home',
      name:'home',
      children:[
        {
          path:'/home/1',
          name:'my',
          component: () => import(/* webpackChunkName: "about" */ '../views/my.vue')
        },{
        path:'/home/2-1',
        name:'work',
        component: () => import(/* webpackChunkName: "about" */ '../views/work.vue')
      },
      {
        path:'/home/2-2',
        name:'chartoom',
        component: () => import(/* webpackChunkName: "about" */ '../views/chatroom.vue')
      },
      {
        path:'/home/2-3',
        name:'group',
        component: () => import(/* webpackChunkName: "about" */ '../views/group.vue')
      },
      {
        path:'/home/2-4-1',
        name:'house',
        component: () => import(/* webpackChunkName: "about" */ '../views/house.vue')
      },
      {
        path:'/home/2-4-2',
        name:'tenancy',
        component: () => import(/* webpackChunkName: "about" */ '../views/tenancy.vue')
      },
      {
        path:'/home/3',
        name:'report',
        component: () => import(/* webpackChunkName: "about" */ '../views/report.vue')
      }
      ],
      component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
    }
  ]
})
