<template>
  <div class="placement-page">
    <div class="container box">

      <div class="job-header job-section" v-if="dashboardJobDetails.company">
        <div class="heading-main">
          <p class="title is-3 job-title">{{dashboardJobDetails.job_title}}</p>
          <p class="subtitle is-6 company-details">{{dashboardJobDetails.company.company_name}}, {{dashboardJobDetails.company.address}}</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag">{{dashboardJobDetails.job_type.job_type}}</span>
          <div class="apply-box">
            <a v-if="!applyKey" class="button is-success" @click="userApplyForPlacement">{{apply}}</a>
            <a v-if="applyKey" class="button is-danger" @click="userCancelPlacement">Cancel</a>
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
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PlacementRoundDetail from '@/components/PlacementRoundDetail'
import placement from '@/api/placement'
// import education from '@/api/education'
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'placement',
  components: {
    'roundBox': PlacementRoundDetail
  },
  data() {
    return {
      placement_id: null,
      jobProfile: {},
      dashboardJobDetails: [],
      roundsData: {
      },
      apply: null,
      applyKey: 0
    }
  },
  created() {
    this.placement_id = this.$route.params.id;
    user.getUserAppliedForPlacement(this.getUserId(), this.placement_id)
    .then((response) => {
      // console.log("placement id-" + this.placement_id);
      // console.log("response.data-" + response.data);
      if(response.data == 0) {
        // console.log("if applied");
        // console.log(response.data == 0);
        this.apply = 'Apply'
        this.applyKey = 0;
        // console.log(this.applyKey == 0);
      }
      else {
        // console.log("else applied");
        this.apply = 'Applied'
        this.applyKey = 1;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
    user.getUserPlacementDetails(this.getUserId(), this.placement_id)
    .then((response) => {
      this.dashboardJobDetails = response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    },
    userApplyForPlacement() {
      user.applyForPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.status == 200) {
          alert('Applied');
          this.apply = 'Applied';
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
    },
    userCancelPlacement() {
      user.cancelPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.status == 204) {
          alert('Registration Cancelled.')
          this.apply = 1;
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
.placement-page {
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
