import Vue from 'vue'
import VueRouter from 'vue-router'
import Edit from '../views/Edit.vue'
import Login from '@/views/Login.vue'
import EmployeeDetail from '@/views/EmployeeDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/detail',
    name: 'Detail',
    component: EmployeeDetail,
    props: {
      default: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "group-foo" */ '../views/Home.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user")
  if (!user && to.name === 'Home') {
    next({ name: 'Login' })
  } else if (!user && to.name === 'Detail') {
    next({ name: 'Login' })
  } else if (!user && to.name === 'Edit') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
