import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    children: [
      {
        path: '/sign',
        component: () => import('../views/Sign'),
      },
      {
        path: '/user',
        component: () => import('../views/User'),
      }, {
        path: '/face',
        name: 'Face',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Face')
      },
      {
        path: '/stu',
        name: 'StuINfo',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/StuInfo')
      },
      {
        path: '/a',
        name: 'A',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/A')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/About')
  // }
  // ,{
  //   path: '/a',
  //   name: 'A',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/A')
  // }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach(function (to, from, next) {

  if (store.state.token === '') {

    if (to.path === '/register') { 
      
    }
    else if (to.path !== '/login') {
      return next('/login')
    }
  }
  next()
})
export default router
