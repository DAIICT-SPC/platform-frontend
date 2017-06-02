<template>
  <div class="placement-page">
    <div class="container box" v-for="dash in dashboardJobDetails" v-if="dash.placement_id == placement_id">

      <div class="job-header job-section">
        <div class="heading-main">
          <p class="title is-3 job-title">{{dash.job_title}}</p>
          <p class="subtitle is-6 company-details">{{dash.company.company_name}}, {{dash.company.address}}</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag"></span>
        </div>
      </div>

      <div class="job-description job-section">
        <b class="section-header">Job Description</b>
        <p> {{dash.job_description}} </p>
      </div>


      <div class="eligibility-criteria job-section">
        <b class="section-header">Eligibility Criteria</b>
        <div class="columns">
          <div class="column" v-for="dashcat in dash.categories">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title"> {{dashcat.name}} </p>
              </header>
              <footer class="stripe-footer">
                <div class="columns is-gapless is-mobile">
                  <div class="column" v-for="dashcriteria in dashcat.criterias">{{dashcriteria.education_id}} <br>{{dashcriteria.cpi_required}} </div>
                </div>
              </footer>
            </div>
          </div>
          <!-- <div class="column">
          <div class="card">
          <header class="card-header">
          <p class="card-header-title"> MScIT </p>
        </header>
        <footer class="stripe-footer">
        <div class="columns is-mobile is-gapless">
        <div class="column">Current <br> 7.01</div>
        <div class="column">Bachelors <br> 7.01</div>
        <div class="column">Higher <br> 7.01</div>
        <div class="column">Secondary <br> 7.01</div>
      </div>
    </footer>
  </div>
</div> -->
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

    <div v-for="selectionProcess in dash.placement_selection">

      <div class="box process">
        <p>{{selectionProcess.round_name}}</p>
        <a>View Info</a>
      </div>

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
import placement from '@/api/placement'
// import education from '@/api/education'
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'placement',
  data() {
    return {
      placement_id: null,
      jobProfile: {},
      dashboardJobDetails: [],
      // education: []
    }
  },
  created() {
    // education.all().then((response) => {
    //   this.education = response.data;
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
    this.placement_id = this.$route.params.id;
    user.getHomeDashboard(this.getUserId()).then((response) => {
      this.dashboardJobDetails = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    placement.getPlacementById(this.placement_id)
    .then((response) => {
      this.jobProfile = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
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
    box-shadow: inset 0px -8px 16px rgba(0, 0, 0, 0.2);

    .title {
      margin-bottom: 0;
      color: #fff;
    }

    .subtitle {
      color: #1d4586;
      font-weight: bold;
      margin-top: 0.5rem;
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
    &::after{
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
      z-index: 5;
      &:first-child:before{
        display: none;
      }
      &:last-child{
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
