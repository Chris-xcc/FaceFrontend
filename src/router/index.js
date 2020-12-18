import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Home/Index'),
      },
      {
        path: '/sign',
        name: 'Sign',
        component: () => import('../views/Sign'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/User'),
      }, {
        path: '/face',
        name: 'Face',
        component: () => import('../views/Face')
      },
      {
        path: '/stu',
        name: 'StuINfo',
        component: () => import('../views/StuInfo')
      },
      {
        path: '/sign_create',
        name: 'SignCreate',
        component: () => import('../views/SignCreate')
      },
      {
        path: '/sign_info',
        name: 'SignInfo',
        component: () => import('../views/SignInfo'),
      },
      {
        path: '/sign_info/:id',
        name: 'SignInfoDetail',
        component: () => import('../views/SignInfoDetail'),
      }

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


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach(function (to, from, next) {

//   if (store.state.token === '') {

//     if (to.path === '/register') {

//     }
//     else if (to.path !== '/login') {
//       return next('/login')
//     }
//   }
//   next()
// })

// router.beforeEach(function (to, from, next) {

//   if (store.state.is_superuser === true || store.state.is_superuser === 'true') {
//     next()
//   }
//   else {
//     if (to.path === '/sign_info' || to.path === '/stu' || to.path === '/sign_create') {
//       return next('/')
//     }
//   }
//   next()

// })


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
