import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/packages/auth/Auth'
import Home from '@/container/Home'
import EducationFirst from '@/container/EducationFirst'
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
import Profile from '@/container/Company/Profile'
import ViewPlacementDetail from '@/container/Company/ViewPlacementDetail'
import NewPlacement from '@/container/Company/NewPlacement'
import PlacementPrimary from '@/container/Company/PlacementDrive/PlacementPrimary'
import SelectCategory from '@/container/Company/PlacementDrive/SelectCategory'
import SelectRoundDetails from '@/container/Company/PlacementDrive/SelectRoundDetails'
import PlacementCriteria from '@/container/Company/PlacementDrive/PlacementCriteria'
import AdminDashboard from '@/container/Admin/AdminDashboard'
import PlacementSeasonsAdminHome from '@/container/Admin/PlacementSeasonsAdminHome'
import PlacementSeasonDrivesAdmin from '@/container/Admin/PlacementSeasonDrivesAdmin'
import PlacementsInSeasons from '@/container/Admin/PlacementsInSeasons'
import PlacementDriveDescription from '@/container/Admin/PlacementDriveDescription'
import SelectionRounds from '@/container/Admin/SelectionRounds'
import SelectionRoundsDynamic from '@/container/Admin/SelectionRoundsDynamic'
import SelectedForOffer from '@/container/Admin/SelectedForOffer'
import CompanywisePlacement from '@/container/Admin/CompanywisePlacement'
import CompanywisePlacementCards from '@/container/Admin/CompanywisePlacementCards'
import PlacementCompanywiseDescription from '@/container/Admin/PlacementCompanywiseDescription'
import CompaniesList from '@/container/Admin/CompaniesList'
import NewPlacementSeason from '@/container/Admin/NewPlacementSeason'
import AdminReportsPage from '@/container/Admin/AdminReportsPage'
import PlacedStudents from '@/container/Admin/Reports/PlacedStudents'
import PlacedCategorywise from '@/container/Admin/Reports/PlacedCategorywise'
import UnplacedStudents from '@/container/Admin/Reports/UnplacedStudents'
import UnplacedCategorywise from '@/container/Admin/Reports/UnplacedCategorywise'
import ExternallyAllowed from '@/container/Admin/Reports/ExternallyAllowed'
import PlacementSeasonManage from '@/container/Admin/PlacementSeasonManage'
import AdminProfile from '@/container/Admin/Profile'
import Category from '@/container/Admin/Category'
import JobType from '@/container/Admin/JobType'
import Education from '@/container/Admin/Education'


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
    path: '/education',
    name: 'education-first',
    component: EducationFirst,
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
      component: Feed,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/company/profile',
      name: 'company-profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
},
{
  path: '/admin',
  component: AdminDashboard,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '/',
      name: 'admin-home',
      component: PlacementSeasonsAdminHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'placement-drives/:season_id',
      component: PlacementSeasonDrivesAdmin,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'placements-in-seasons',
          component: PlacementsInSeasons,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'placements-drive-description/:placement_id',
          name: 'placements-drive-description',
          component: PlacementDriveDescription,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'selection-rounds/:placement_id',
          name: 'selection-rounds',
          component: SelectionRounds,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'selection-rounds-dynamic/:placement_id/:round_id',
          name: 'selection-rounds-dynamic',
          component: SelectionRoundsDynamic,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'selected-for-offer/:placement_id',
          name: 'selected-for-offer',
          component: SelectedForOffer,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'companywise-placement',
          name: 'companywise-placement',
          component: CompanywisePlacement,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'placement-companywise-description',
          name: 'placement-companywise-description',
          component: PlacementCompanywiseDescription,
          meta: {
            requiresAuth: true
          }
        },
        //PlacementCompanywiseDescription
        {
          path: 'companywise-placement-cards/:company_id',
          name: 'companywise-placement-cards',
          component: CompanywisePlacementCards,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'company-list',
          name: 'company-list',
          component: CompaniesList,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: 'admin-reports/:season_id',
      component: AdminReportsPage,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'placed-students',
          component: PlacedStudents,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'unplaced-students',
          name: 'unplaced-students',
          component: UnplacedStudents,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'placed-categorywise',
          name: 'placed-categorywise',
          component: PlacedCategorywise,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'unplaced-categorywise',
          name: 'unplaced-categorywise',
          component: UnplacedCategorywise,
          meta: {
            requiresAuth: true
          }
        },
        //ExternallyAllowed
        {
          path: 'externally-allowed',
          name: 'externally-allowed',
          component: ExternallyAllowed,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: 'new-season-start',
      component: NewPlacementSeason,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          name: 'placement-season-manage',
          component: PlacementSeasonManage,
          meta: {
            requiresAuth: true
          }
        },

        {
          path: 'categories',
          name: 'show-add-categories',
          component: Category,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'jobtypes',
          name: 'show-add-jobtypes',
          component: JobType,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'education',
          name: 'show-add-education',
          component: Education,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: 'admin-profile',
      name: 'admin-profile',
      component: AdminProfile,
      meta: {
        requiresAuth: true
      }
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
