import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/packages/auth/Auth'
import Home from '@/container/Home'
import SignUp from '@/container/SignUp'
import Page404 from '@/container/Page404'
import Dashboard from '@/container/Dashboard'
import Feed from '@/container/Feed'
import JobProfile from '@/container/JobProfile'
import Placement from '@/container/Placement'
import MyProfile from '@/container/MyProfile'
import About from '@/container/MyProfile/About'
import Academic from '@/container/MyProfile/Academic'
import Resume from '@/container/MyProfile/Resume'
import CompanyDashboard from '@/container/Company/CompanyDashboard'
import ViewAllPlacement from '@/container/Company/ViewAllPlacement'
import ViewPlacementDetail from '@/container/Company/ViewPlacementDetail'
import NewPlacement from '@/container/Company/NewPlacement'
import PlacementPrimary from '@/container/Company/PlacementDrive/PlacementPrimary'
import SelectCategory from '@/container/Company/PlacementDrive/SelectCategory'
import SelectRoundDetails from '@/container/Company/PlacementDrive/SelectRoundDetails'
import PlacementCriteria from '@/container/Company/PlacementDrive/PlacementCriteria'


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
    path: '/signup/:code',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/404-page-not-found',
    name: 'page-404',
    component: Page404,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [{
      path: '/',
      name: 'dashboard',
      meta: {
        requiresAuth: true
      },
      component: Feed
    },
    {
      path: 'job-profiles',
      name: 'jobprofile',
      meta: {
        requiresAuth: true
      },
      component: JobProfile
    },
    {
      path: 'job-profiles/:id',
      name: 'view-job-profile',
      meta: {
        requiresAuth: true
      },
      component: Placement
    },
    {
      path: 'profile',
      component: MyProfile,
      children: [{
        path: '/',
        name: 'about',
        meta: {
          requiresAuth: true
        },
        component: About
      },
      {
        path: 'academic',
        name: 'academic',
        meta: {
          requiresAuth: true
        },
        component: Academic
      },
      {
        path: 'resume',
        name: 'resume',
        meta: {
          requiresAuth: true
        },
        component: Resume
      }
    ]
  }
]
},
{
  path: '/company',
  meta: {
    requiresAuth: true
  },
  component: CompanyDashboard,
  children: [
    {
      path: '/',
      name: 'company-home',
      meta: {
        requiresAuth: true
      },
      component: ViewAllPlacement
    },
    {
      path: 'view-placement-detail/:id',
      name: 'view-placement-detail',
      meta: {
        requiresAuth: true
      },
      component: ViewPlacementDetail
    },
    {
      path: 'new-placement',
      meta: {
        requiresAuth: true
      },
      component: NewPlacement,
      children: [
        {
          path: '/',
          name: 'placement-primary',
          meta: {
            requiresAuth: true
          },
          component: PlacementPrimary
        },
        {
          path: 'select-category',
          name: 'select-category',
          meta: {
            requiresAuth: true
          },
          component: SelectCategory
        },
        {
          path: 'select-round-details',
          name: 'select-round-details',
          meta: {
            requiresAuth: true
          },
          component: SelectRoundDetails
        },
        {
          path: 'placement-criteria',
          name: 'placement-criteria',
          meta: {
            requiresAuth: true
          },
          component: PlacementCriteria
        },
      ]
    }
  ]
}
]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to home page.
    if (!Auth.isAuthenticated()) {
      next({
        name: 'home'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
