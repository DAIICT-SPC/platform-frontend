import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/container/Home'
import Dashboard from '@/container/Dashboard'
import Feed from '@/container/Feed'
import JobProfile from '@/container/JobProfile'
import Placement from '@/container/Placement'
import MyProfile from '@/container/MyProfile'
import About from '@/container/MyProfile/About'
import Academic from '@/container/MyProfile/Academic'
import Resume from '@/container/MyProfile/Resume'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'is-active',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [{
      path: 'feed',
      name: 'dashboard',
      component: Feed
    },
    {
      path: 'job-profiles',
      name: 'jobprofile',
      component: JobProfile,
    },
    {
      path: 'job-profiles/:id',
      name: 'view-job-profile',
      component: Placement
    },
    {
      path: 'profile',
      component: MyProfile,
      children: [{
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'academic',
        name: 'academic',
        component: Academic
      },
      {
        path: 'resume',
        name: 'resume',
        component: Resume
      }
    ]
  }
]
}
]
});

router.afterEach((to, from) => {
  if (window.localStorage.getItem('token') == null) {
    router.push({
      name: 'home'
    });
  }
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.forVisitors)){
//     if(Vue.auth.isAuthenticated()){
//       next({
//         name: 'dashboard'
//       })
//     }else{
//       next();
//     }
//   }
//   else if(to.matched.some(record => record.meta.forAuth)){
//     if(!Vue.auth.isAuthenticated()){
//       next({
//         path: '/'
//       })
//     }else{
//       next();
//     }
//   }
//   else{
//     next();
//   }
// })

export default router;
