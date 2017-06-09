<template>
  <div class="placement-page">
    <div class="container box">

      <div class="job-header job-section" v-if="placementDescription.company">
        <div class="heading-main">
          <p class="title is-3 job-title">{{placementDescription.job_title}}</p>
          <p class="subtitle is-6 company-details">{{placementDescription.company.company_name}}, {{placementDescription.location}}</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag">{{placementDescription.job_type.job_type}}</span>
        </div>
      </div>

      <div class="job-description job-section">
        <b class="section-header">Job Description</b>
        <p>{{ placementDescription.job_description }}</p>
      </div>


      <div class="eligibility-criteria job-section">
        <b class="section-header">Eligibility Criteria</b>

        <div class="columns is-multiline">

          <div class="column" v-for="categories in placementDescription.categories">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title"> {{ categories.name }} </p>
                <div class="header-action is-pulled-right edit-btn">
                </div>
              </header>

              <footer class="stripe-footer">
                <div class="columns">
                  <div class="column" v-for="cat in categories.criterias">{{ cat.education.name }} <br> {{cat.cpi_required}}</div>
                </div>
              </footer>
              <div class="criteria-box">
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="hiring-process job-section">
        <b class="section-header">Hiring Process</b>

        <div class="processes">

          <div class="box process-application process">
            <a class="application">
              <span class="icon">
                <i class="fa fa-user-o"></i>
              </span>
              <span>Application</span> &nbsp;
            </a>
            <router-link :to="{name: 'company-selection-rounds', params: {
              placement_id: this.placement_id
            } }">View Info</router-link> &nbsp;
          </div>


          <div class="box process" v-for="round in placementDescription.placement_selection">
            <p>
              <b>{{ round.round_name }}</b>
            </p>
            <router-link :to="{ name: 'company-selection-rounds-dynamic', params:
            { placement_id: placement_id, round_id:round.round_no} }" class="is-success">View info</router-link><br>
            <!-- round box date time not set -->
          </div>


          <div class="process-offer process">
						<div class="box offer">
							<p>Offer</p>
							<router-link :to="{ name: 'company-selected-for-offer', params: { placement_id:placement_id }  }" class="is-success">View info</router-link><br>
						</div>
					</div>


        </div>
        <div class="">

          <a class="button"><i class="fa fa-comments" aria-hidden="true"></i> &nbsp; Feedback</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PlacementRoundDetail from '@/components/PlacementRoundDetail'
import ViewPlacementEditModal from '@/components/ViewPlacementEditModal'
import placement from '@/api/placement'
// import education from '@/api/education'
import company from '@/api/company'
import Auth from '@/packages/auth/Auth'
import EligibilityCriteriaBoxCompany from '@/components/EligibilityCriteriaBoxCompany'
export default {
  name: 'placement',
  components: {
    'roundBox': PlacementRoundDetail,
    'drive-box': ViewPlacementEditModal,
    'criteria-box': EligibilityCriteriaBoxCompany,
  },
  data() {
    return {
      showCriteria: false,
      placement_id: null,
      jobProfile: {},
      placementDescription: [],
      roundsData: {
      },
      apply: null,
      applyKey: 0,
      showVenue: false,
      hide: "Hide",
      show: "Edit",
      showDesc: false
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.$bus.$on('closeDescription', () => {
      this.showDesc = false;
    });
    company.getPlacementDetails(this.getUserId(), this.placement_id)
    .then((response) => {
      this.placementDescription = response.data;
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

    },
    userCancelPlacement() {

    }
  }
}
</script>

<style lang="scss">
.placement-page {
  padding: 0.5rem 1.5rem;
  padding-top: 1.3rem;

  .container.box {
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
  }

  .criteria-box {
    margin-top: 1rem;
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
        // padding-bottom: 0;
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
      // z-index: 2;
    }
    .box {
      text-align: center;
    }
    .application {
      // pointer-events: none;
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
