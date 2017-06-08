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
        <b class="section-header">Job Description
          <div class="header-action is-pulled-right">
            <div class="button is-white" @click="showDesc = !showDesc" v-if="!showDesc"> {{show}} </div>
            <div class="button is-white" @click="showDesc = !showDesc" v-if="showDesc"> {{hide}} </div>
          </div>
        </b>

        <p>{{ placementDescription.job_description }}</p>
        <drive-box :placementDescription="placementDescription" v-if="showDesc"></drive-box>
      </div>


      <div class="eligibility-criteria job-section">
        <b class="section-header">Eligibility Criteria
          <div class="header-action is-pulled-right">
            <div class="button is-white" @click="showOpenFor = true"> Add </div>
          </div>
        </b>

        <open-for-modal v-if="showOpenFor" @close="showOpenFor = !showOpenFor"></open-for-modal>

        <div class="columns is-multiline margin-set">
          <div class="column" v-for="categories in placementDescription.categories">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title"> {{ categories.name }} </p>
                <div class="header-action is-pulled-right">
                  <input type="hidden" v-model="category_id = categories.id">
                  <!-- {{categories.id}} -->
                  <a class="button is-white" @click="delOpenFor(categories.id)">Delete</a>
                </div>
              </header>
              <input type="hidden" v-model="category_id_new = categories.id">
              <category-education-modal :key="category_id_new" :category_id="category_id_new" v-if="showCatEd" @close="showCatEd=!showCatEd"></category-education-modal>

              <footer class="stripe-footer">
                <div class="columns">
                  <div class="column" v-for="cat in categories.criterias">{{ cat.education.name }} <br> {{cat.cpi_required}}</div>
                </div>
              </footer>
              <div class="criteria-box">
                <criteria-box :key="categories.id" :criterias="categories.criterias"></criteria-box>
                <add-criteria-box :key="categories.id" :category_id="categories.id"></add-criteria-box>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="hiring-process job-section">
        <b class="section-header">Hiring Process
          <div class="header-action is-pulled-right">
            <div class="button is-white" @click="showAddSelection = true"> Add </div>
          </div>
        </b>
        <add-selection-round @close="showAddSelection=false" v-if="showAddSelection"></add-selection-round>
        <div class="processes">

          <div class="process-application process">
            <a class="button">
              <span class="icon">
                <i class="fa fa-user-o"></i>
              </span>
              <span>Application</span> &nbsp;
              <div class="view-info">
                <!-- <router-link :to="{ name: 'selection-rounds', params: { placement_id: placement_id } }" class="is-success">View info</router-link> -->
              </div>
            </a>
          </div>


          <div class="box process" v-for="round in placementDescription.placement_selection">
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
import EditSelectionRounds from '@/components/Company/EditSelectionRounds'
import ViewPlacementEditModal from '@/components/ViewPlacementEditModal'
import OpenForModal from '@/components/Company/OpenForModal'
import placement from '@/api/placement'
// import education from '@/api/education'
import company from '@/api/company'
import Auth from '@/packages/auth/Auth'
import EligibilityCriteriaBoxCompany from '@/components/EligibilityCriteriaBoxCompany'
import DraftEligibilityCriteriaModal from '@/components/Company/DraftEligibilityCriteriaModal'
import AddSelectionRound from '@/components/Company/AddSelectionRound'
import AddEligibilityCriteria from '@/components/Company/AddEligibilityCriteria'
export default {
  name: 'placement',
  components: {
    'roundBox': EditSelectionRounds,
    'drive-box': ViewPlacementEditModal,
    'criteria-box': EligibilityCriteriaBoxCompany,
    'category-education-modal': DraftEligibilityCriteriaModal,
    'open-for-modal': OpenForModal,
    'add-criteria-box': AddEligibilityCriteria,
    'add-selection-round': AddSelectionRound
  },
  data() {
    return {
      category_id_new: null,
      category_id: null,
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
      showDesc: false,
      showCatEd: false,
      showOpenFor: false,
      showAddSelection: false
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    // this.getEducation();
    this.$bus.$on('closeDescription', () => {
      this.showDesc = false;
    });
    this.getDetails();
    this.$bus.$on('close', () => {
      this.showOpenFor = false;
      this.getDetails();
    })
  },
  beforeUpdate() {
    this.$bus.$on('deleted', () => {
      this.getDetails();
    });
  },
  methods: {
    getDetails() {
      company.getPlacementDetails(this.getUserId(), this.placement_id)
      .then((response) => {
        this.placementDescription = response.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },
    getEducation() {
      console.log("cat: " + this.category_id);
      company.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, this.category_id)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    },
    delOpenFor(category_id) {
      company.deleteOpenFor(this.getUserId(), this.placement_id, category_id)
      .then((response) => {
        console.log(response);
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

  .margin-set {
    margin: 0;
  }

  .add-btn {
    margin-top: 0.4rem;
  }

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

    .button.is-white.add {
      margin-top: 0.4rem;
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
