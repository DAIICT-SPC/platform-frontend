import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/packages/auth/Auth'
import Home from '@/container/Home'
import EducationFirst from '@/container/EducationFirst'
import SignUp from '@/container/SignUp'
import ChangePassword from '@/container/ChangePassword'
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
import DraftPlacements from '@/container/Company/Manage/DraftPlacements'
import DraftPlacementDetails from '@/container/Company/Manage/DraftPlacementDetails'
import Profile from '@/container/Company/Profile'
import ViewPlacementDetail from '@/container/Company/ViewPlacementDetail'
//Company Selection Rounds
import CompanySelectionRounds from '@/container/Company/Rounds/SelectionRounds'
import CompanySelectionRoundsDynamic from '@/container/Company/Rounds/SelectionRoundsDynamic'
import CompanySelectedForOffer from '@/container/Company/Rounds/SelectedForOffer'
import NewPlacement from '@/container/Company/NewPlacement'
import PlacementPrimary from '@/container/Company/PlacementDrive/PlacementPrimary'
import SelectCategory from '@/container/Company/PlacementDrive/SelectCategory'
import SelectRoundDetails from '@/container/Company/PlacementDrive/SelectRoundDetails'
import PlacementCriteria from '@/container/Company/PlacementDrive/PlacementCriteria'
import AdminDashboard from '@/container/Admin/AdminDashboard'
import DashboardPlacementSeasonsAdminHome from '@/container/Admin/DashboardPlacementSeasonsAdminHome'
import PlacementSeasonDrivesAdmin from '@/container/Admin/PlacementSeasonDrivesAdmin'
import PlacementsInSeasons from '@/container/Admin/SeasonDrives/PlacementsInSeasons'
import PlacementDriveDescription from '@/container/Admin/SeasonDrives/PlacementDriveDescription'
//Admin Selection Rounds
import SelectionRounds from '@/container/Admin/Rounds/SelectionRounds'
import SelectionRoundsDynamic from '@/container/Admin/Rounds/SelectionRoundsDynamic'
import SelectedForOffer from '@/container/Admin/Rounds/SelectedForOffer'
import CompanywisePlacement from '@/container/Admin/SeasonDrives/CompanywisePlacement'
import CompanywisePlacementCards from '@/container/Admin/SeasonDrives/CompanywisePlacementCards'
import CompaniesList from '@/container/Admin/SeasonDrives/CompaniesList'
import NewPlacementSeason from '@/container/Admin/NewPlacementSeason'
import AdminReportsPage from '@/container/Admin/AdminReportsPage'
import PlacedStudents from '@/container/Admin/Reports/PlacedStudents'
import PlacedCategorywise from '@/container/Admin/Reports/PlacedCategorywise'
import UnplacedStudents from '@/container/Admin/Reports/UnplacedStudents'
import UnplacedCategorywise from '@/container/Admin/Reports/UnplacedCategorywise'
import ExternallyAllowed from '@/container/Admin/Reports/ExternallyAllowed'
import StudentInfo from '@/container/Admin/Reports/StudentInfo'
import FeedbacksView from '@/container/Admin/Reports/FeedbacksView'
import PlacementSeasonManage from '@/container/Admin/Manage/PlacementSeasonManage'
import AdminProfile from '@/container/Admin/Profile'
import Category from '@/container/Admin/Manage/Category'
import JobType from '@/container/Admin/Manage/JobType'
import Education from '@/container/Admin/Manage/Education'
import AddUsers from '@/container/Admin/Manage/AddUsers'


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
    path: '/change-password/:code',
    name: 'change-password',
    component: ChangePassword,
  },
  {
    path: '/education',
    name: 'education-first',
    component: EducationFirst,
    meta: {
      requiresAuth: true,
      shouldBeStudent: true
    }
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
        requiresAuth: true,
        shouldBeStudent: true
      }
    },
    {
      path: 'job-profiles',
      name: 'jobprofile',
      meta: {
        requiresAuth: true,
        shouldBeStudent: true
      },
      component: JobProfile
    },
    {
      path: 'job-profiles/:placement_id',
      name: 'view-job-profile',
      meta: {
        requiresAuth: true,
        shouldBeStudent: true
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
          requiresAuth: true,
          shouldBeStudent: true
        },
        component: About
      },
      {
        path: 'academic',
        name: 'academic',
        meta: {
          requiresAuth: true,
          shouldBeStudent: true
        },
        component: Academic
      },
      {
        path: 'resume',
        name: 'resume',
        meta: {
          requiresAuth: true,
          shouldBeStudent: true
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
    requiresAuth: true,
    shouldBeCompany: true
  },
  component: CompanyDashboard,
  children: [
    {
      path: '/',
      name: 'company-home',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: ViewAllPlacement
    },
    {
      path: 'manage-drafts',
      name: 'manage-drafts',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: DraftPlacements
    },
    {
      path: 'draft-placement-details/:placement_id',
      name: 'draft-placement-details',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: DraftPlacementDetails
    },
    {
      path: 'view-placement-detail/:placement_id',
      name: 'view-placement-detail',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: ViewPlacementDetail
    },
    {
      path: 'company-selection-rounds/:placement_id',
      name: 'company-selection-rounds',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: CompanySelectionRounds
    },
    {
      path: 'company-selection-rounds-dynamic/:placement_id/:round_id',
      name: 'company-selection-rounds-dynamic',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: CompanySelectionRoundsDynamic
    },
    {
      path: 'company-selected-for-offer/:placement_id',
      name: 'company-selected-for-offer',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: CompanySelectedForOffer
    },
    {
      path: 'new-placement',
      meta: {
        requiresAuth: true,
        shouldBeCompany: true
      },
      component: NewPlacement,
      children: [
        {
          path: '/',
          name: 'placement-primary',
          meta: {
            requiresAuth: true,
            shouldBeCompany: true
          },
          component: PlacementPrimary
        },
        {
          path: 'select-category/:placement_id',
          name: 'select-category',
          meta: {
            requiresAuth: true,
            shouldBeCompany: true
          },
          component: SelectCategory
        },
        {
          path: 'select-round-details/:placement_id',
          name: 'select-round-details',
          meta: {
            requiresAuth: true,
            shouldBeCompany: true
          },
          component: SelectRoundDetails
        },
        {
          path: 'placement-criteria/:placement_id',
          name: 'placement-criteria',
          meta: {
            requiresAuth: true,
            shouldBeCompany: true
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
        requiresAuth: true,
        shouldBeCompany: true
      }
    }
  ]
},
{
  path: '/admin',
  component: AdminDashboard,
  meta: {
    requiresAuth: true,
    shouldBeAdmin: true
  },
  children: [
    {
      path: '/',
      name: 'admin-home',
      component: DashboardPlacementSeasonsAdminHome,
      meta: {
        requiresAuth: true,
        shouldBeAdmin: true
      }
    },
    {
      path: 'placement-drives/:season_id',
      component: PlacementSeasonDrivesAdmin,
      meta: {
        requiresAuth: true,
        shouldBeAdmin: true
      },
      children: [
        {
          path: '/',
          name: 'placements-in-seasons',
          component: PlacementsInSeasons,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'placements-drive-description/:placement_id',
          name: 'placements-drive-description',
          component: PlacementDriveDescription,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'selection-rounds/:placement_id',
          name: 'selection-rounds',
          component: SelectionRounds,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'selection-rounds-dynamic/:placement_id/:round_id',
          name: 'selection-rounds-dynamic',
          component: SelectionRoundsDynamic,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'selected-for-offer/:placement_id',
          name: 'selected-for-offer',
          component: SelectedForOffer,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'companywise-placement',
          name: 'companywise-placement',
          component: CompanywisePlacement,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'companywise-placement-cards/:company_id',
          name: 'companywise-placement-cards',
          component: CompanywisePlacementCards,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'company-list',
          name: 'company-list',
          component: CompaniesList,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
      ]
    },
    {
      path: 'admin-reports/:season_id/',
      component: AdminReportsPage,
      meta: {
        requiresAuth: true,
        shouldBeAdmin: true
      },
      children: [
        {
          path: '/',
          name: 'placed-students',
          component: PlacedStudents,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'unplaced-students',
          name: 'unplaced-students',
          component: UnplacedStudents,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'placed-categorywise',
          name: 'placed-categorywise',
          component: PlacedCategorywise,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'unplaced-categorywise',
          name: 'unplaced-categorywise',
          component: UnplacedCategorywise,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        //ExternallyAllowed
        {
          path: 'externally-allowed',
          name: 'externally-allowed',
          component: ExternallyAllowed,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        // StudentInfo
        {
          path: 'student-info',
          name: 'student-info',
          component: StudentInfo,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        // FeedbacksView
        {
          path: 'feedbacks-view',
          name: 'feedbacks-view',
          component: FeedbacksView,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
      ]
    },
    {
      path: 'new-season-start',
      component: NewPlacementSeason,
      meta: {
        requiresAuth: true,
        shouldBeAdmin: true
      },
      children: [
        {
          path: '/',
          name: 'placement-season-manage',
          component: PlacementSeasonManage,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },

        {
          path: 'categories',
          name: 'show-add-categories',
          component: Category,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'jobtypes',
          name: 'show-add-jobtypes',
          component: JobType,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'education',
          name: 'show-add-education',
          component: Education,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        },
        {
          path: 'add-users',
          name: 'add-users',
          component: AddUsers,
          meta: {
            requiresAuth: true,
            shouldBeAdmin: true
          }
        }
      ]
    },
    {
      path: 'admin-profile',
      name: 'admin-profile',
      component: AdminProfile,
      meta: {
        requiresAuth: true,
        shouldBeAdmin: true
      }
    }
  ]
}
]
});


router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {

    if (!Auth.isAuthenticated())
    {
      next({
        name: 'home'
      });
    }
    else {
      if(to.meta.shouldBeStudent && !Auth.isStudent())
      {
        next({
          name: 'page-404'
        })
      }
      else if(to.meta.shouldBeAdmin && !Auth.isAdmin())
      {
        next({
          name: 'page-404'
        })
      }
      else if(to.meta.shouldBeCompany && !Auth.isCompany())
      {
        next({
          name: 'page-404'
        })
      }
      else {
        next();
      }
    }
  }
  else
  {
    next(); // make sure to always call next()!
  }
});

export default router;
