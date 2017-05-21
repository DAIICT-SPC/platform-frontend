import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/container/Home'
import Dashboard from '@/container/Dashboard'
import Feed from '@/container/Feed'
import JobProfile from '@/container/JobProfile'
import MyProfile from '@/container/MyProfile'
import About from '@/container/MyProfile/About'
import Academic from '@/container/MyProfile/Academic'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'is-active',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [{
          path: '/',
          name: 'dashboard',
          component: Feed
        },
        {
          path: 'job-profile',
          name: 'JobProfile',
          component: JobProfile
        },
        {
          path: 'profile',
          component: MyProfile,
          children: [{
              path: '/',
              name: 'About',
              component: About
            },
            {
              path: 'academic',
              name: 'Academic',
              component: Academic
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

export default router;
