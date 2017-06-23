<template>
  <div class="student-placement-page">
    <div class="container box">

      <div class="job-header job-section" v-if="dashboardJobDetails.company">
        <div class="heading-main">
          <p class="title is-3 job-title">{{dashboardJobDetails.job_title}}</p>
          <p class="subtitle is-6 company-details">{{dashboardJobDetails.company.company_name}}, {{dashboardJobDetails.company.address}}</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag">{{dashboardJobDetails.job_type.job_type}}</span>
          <div v-if="dashboardJobDetails.status == 'closed'">
            <span class="tag is-light">{{dashboardJobDetails.status}}</span>
          </div>
          <!-- <div v-if="dashboardJobDetails.status == 'application'">
          <span class="tag is-success">{{dashboardJobDetails.status}}</span>
        </div> -->
        <div class="apply-box" v-if="dashboardJobDetails.status != 'closed'">
          <a v-if="!applyKey && eligible" class="button is-success" @click="userApplyForPlacement">Apply</a>
          <a v-if="applyKey && eligible" class="button is-danger" @click="userCancelPlacement">Cancel</a>
        </div>
      </div>
    </div>

    <div class="job-description job-section">
      <b class="section-header">Job Description</b>
      <p> {{dashboardJobDetails.job_description}} </p>
    </div>


    <div class="eligibility-criteria job-section">
      <b class="section-header">Eligibility Criteria</b>

      <div class="columns">

        <div class="column" v-for="categories in dashboardJobDetails.categories">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title"> {{ categories.name }} </p>
            </header>
            <footer class="stripe-footer">
              <div class="columns is-gapless is-mobile">
                <div class="column" v-for="cat in categories.criterias">
                  {{ cat.education.name }} <br> CPI Required: {{cat.cpi_required}}
                </div>
              </div>
            </footer>
          </div>
        </div>

      </div>
    </div>

    <div class="hiring-process job-section">
      <b class="section-header">Hiring Process</b>

      <div class="processes">

        <div class="process-application process">
          <a class="button">
            <span class="icon">
              <i class="fa fa-user-o"></i>
            </span>
            <span>Application</span>
          </a>
        </div>


        <div class="box process" v-for="round in dashboardJobDetails.placement_selection">
          <p>
            <b>{{ round.round_name }}</b>
          </p>
          <roundBox :key="round.id" :round="round"></roundBox>
        </div>


        <div class="process-offer process">
          <a class="button">
            <span class="icon">
              <i class="fa fa-file-text-o"></i>
            </span>
            <span>Offer</span>
          </a>
        </div>

      </div>
      <div>
        <a @click="isFeedbackGiven" class="button"><i class="fa fa-comments" aria-hidden="true"></i> &nbsp; Feedback</a>
      </div>
    </div>
  </div>
  <company-feedback-modal v-if="feedbackModal" @close="feedbackModal = false"></company-feedback-modal>
</div>
</div>
</template>

<script>
import PlacementRoundDetail from '@/components/PlacementRoundDetail'
import FeedBackModal from '@/components/Student/FeedBackModal';
import placement from '@/api/placement'
// import education from '@/api/education'
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'student-placement-page',
  components: {
    'roundBox': PlacementRoundDetail,
    'company-feedback-modal': FeedBackModal
  },
  data() {
    return {
      eligible: true,
      placement_id: null,
      jobProfile: {},
      dashboardJobDetails: [],
      roundsData: {
      },
      applyKey: null,
      feedbackModal: false
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.checksEligibility();
    this.checkIfSameCategory();
    this.getUserAppliedForPlacement();
    this.getUserPlacementDetails();
    this.$bus.$on('feedback-done', () => {
      this.feedbackModal = false;
      this.getUserPlacementDetails();
    })
  },
  methods: {
    isFeedbackGiven() {
      user.isFeedbackGiven(this.getUserId(), this.placement_id)
      .then((response) => {
        //if true then dont allow, if false then allow
        if(response.data == false) {
          this.feedbackModal = true;
        }
        else {
          let toast = this.$toasted.error("Feedback already Provided.", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    checksEligibility() {
      user.checksEligibility(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.data.status == 'eligible') {
          this.eligible = true;
        }
        else {
          this.eligible = false;
        }
      })
      .catch((error) => {
        if(error.response.data.status == 'ineligible') {
          this.eligible = false;
        }
        else {
          this.eligible = true;
          console.log(error);
        }
      });
    },
    checkIfSameCategory() {
      user.checkIfSameCategory(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.data == 'category exists') {
          //working properly
        }
        else {
          this.$router.push({ name: 'page-404' });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    getUserPlacementDetails() {
      user.getUserPlacementDetails(this.getUserId(), this.placement_id)
      .then((response) => {
        this.dashboardJobDetails = response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    getUserAppliedForPlacement() {
      user.getUserAppliedForPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.data == 0) {
          this.applyKey = 0;
        }
        else {
          this.applyKey = 1;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    getUserId() {
      return Auth.getUserToken();
    },
    userApplyForPlacement() {
      user.applyForPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.status == 200) {
          let toast = this.$toasted.success("Applied!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.applyKey = 0;
          this.checkIfSameCategory();
          this.getUserAppliedForPlacement();
          this.getUserPlacementDetails();
        }
      })
      .catch((error) => {
        console.log(error);
        let toast = this.$toasted.error(error.response.data.message, {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
      })
    },
    userCancelPlacement() {
      user.cancelPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.status == 204) {
          let toast = this.$toasted.error("Registration Cancelled!", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.apply = 1;
          this.checkIfSameCategory();
          this.getUserAppliedForPlacement();
          this.getUserPlacementDetails();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss">
.student-placement-page {
  padding: 0.5rem 1.5rem;

  .container.box {
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
  }

  .job-section {
    border-bottom: solid 1px #ddd;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;

    .section-header {
      display: block;
      margin-bottom: 1rem;
    }
  }

  .job-header {
    padding: 2.5rem;
    background: #3273dc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0 -8px 16px rgba(0, 0, 0, 0.2);

    .title {
      margin-bottom: 0;
      color: #fff;
    }

    .subtitle {
      color: #1d4586;
      font-weight: bold;
      margin-top: 0.5rem;
    }

    .header-action {
      .apply-box {
        margin-top: 10px;
        .button {
          width: 100%;
        }
      }
    }
  }

  .job-description {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .eligibility-criteria {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .stripe-footer {
      .column {
        padding: 1rem;
        text-align: center;
      }
    }
  }

  .hiring-process {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .processes {
    max-width: 400px;
    width: 100%;
    margin: auto;
    text-align: center;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 2px;
      background: #ddd;
      top: 0;
      left: 50%;
      margin-left: -1px;
      z-index: 2;
    }
    .box {
      text-align: center;
    }
    .button {
      pointer-events: none;
      .icon {
        margin-right: 0.5rem;
        .fa {
          font-size: 1rem;
        }
      }
    }

    .process {
      position: relative;
      margin: 2rem 0;
      z-index: 3;
      &:first-child:before {
        display: none;
      }
      &:last-child {
        padding-top: 0.3rem;
      }
      &:before {
        left: 47.5%;
        top: -11%;
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #ddd;
        content: ' ';
      }
    }
  }
}
</style>
