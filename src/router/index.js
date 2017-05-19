import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/container/SignIn'
import Navbar from '@/components/Navbar'
import Home from '@/container/Home'
import JobProfile from '@/container/JobProfile'
import MyProfile from '@/container/MyProfile'
import About from '@/container/MyProfile/About'
import Academic from '@/container/MyProfile/Academic'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/dashboard',
    name: 'Navbar',
    component: Navbar,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/job-profile',
        name: 'JobProfile',
        component: JobProfile
      },
      {
        path: '/my-profile',
        name: 'MyProfile',
        component: MyProfile,
        children: [{
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/academic',
          name: 'Academic',
          component: Academic
        }]
      }]
    }
  ]
})
