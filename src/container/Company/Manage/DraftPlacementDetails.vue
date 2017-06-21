<template>
  <div class="placement-page">
    <div class="container box">

      <!-- Header -->
      <div class="job-header job-section" v-if="placementDescription.company">
        <div class="heading-main">
          <p class="title is-3 job-title">{{placementDescription.job_title}}</p>
          <p class="subtitle is-6 company-details">{{placementDescription.company.company_name}}, {{placementDescription.location}}</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag">{{placementDescription.job_type.job_type}}</span>
        </div>
      </div>

      <!-- Job Description -->
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


      <!-- Eligibility Criteria -->
      <div class="eligibility-criteria job-section">
        <b class="section-header">Eligibility Criteria
          <div class="header-action is-pulled-right">
            <div class="button is-white" @click="showOpenFor = true"> Add </div>
          </div>
        </b>

        <open-for-modal v-if="showOpenFor" @close="showOpenFor = !showOpenFor"></open-for-modal>

        <!-- All Criterias in a loop  -->
        <div class="columns is-multiline margin-set">
          <div class="column" v-for="categories in placementDescription.categories">
            <div class="card">
              <header class="card-header">
                <div class="card-header-title"> {{ categories.name }} </div>
                <div class="header-action">
                  <input type="hidden" v-model="category_id = categories.id">
                  <a class="button is-white delete-btn" @click="delOpenFor(categories.id)">
                  Delete </a>
                </div>
              </header>
              <!-- <input type="hidden" v-model="category_id_new = categories.id"> -->
              <!-- <category-education-modal :key="category_id_new" :category_id="category_id_new"
              v-if="" @close="showCatEd=!showCatEd"></category-education-modal> -->

              <footer class="stripe-footer">
                <div class="columns">
                  <div class="column" v-for="cat in categories.criterias">{{ cat.education.name }}
                    <br> {{cat.cpi_required}}
                  </div>
                </div>
              </footer>
              <div class="columns criteria-box">
                <div class="column">
                  <edit-criteria-box :key="categories.id" :criterias="categories.criterias"></edit-criteria-box>
                </div>
                <div class="column">
                  <add-criteria-box :key="categories.id" :categories="categories"></add-criteria-box>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Hiring Process -->
      <div class="hiring-process job-section">
        <b class="section-header">Hiring Process
          <div class="header-action is-pulled-right">
            <div class="button is-white" @click="showAddSelection = true"> Add </div>
          </div>
        </b>
        <add-selection-round v-if="showAddSelection"></add-selection-round>
        <div class="processes">

          <div class="process-application process">
            <a class="button">
              <span class="icon">
                <i class="fa fa-user-o"></i>
              </span>
              <span> Application </span> &nbsp;
              <div class="view-info">
                <!-- <router-link :to="{ name: 'selection-rounds', params: { placement_id: placement_id } }" class="is-success">View info</router-link> -->
              </div>
            </a>
          </div>


          <div class="box process" v-for="round in placementDescription.placement_selection">
            <p>
              <b>{{ round.round_name }}</b>
            </p>
            <edit-selection-roundBox :key="round.id" :round="round"></edit-selection-roundBox>
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
import placement from '@/api/placement';
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import ViewPlacementEditModal from '@/components/Company/ViewPlacementEditModal';
import OpenForModal from '@/components/Company/OpenForModal';
import EligibilityCriteriaBoxCompany from '@/components/EligibilityCriteriaBoxCompany';
import AddEligibilityCriteria from '@/components/Company/AddEligibilityCriteria';
import AddSelectionRound from '@/components/Company/AddSelectionRound';
import EditSelectionRounds from '@/components/Company/EditSelectionRounds';
// import DraftEligibilityCriteriaModal from '@/components/Company/DraftEligibilityCriteriaModal';

export default {
  name: 'placement',
  components: {
    'drive-box': ViewPlacementEditModal,
    'open-for-modal': OpenForModal,
    'edit-criteria-box': EligibilityCriteriaBoxCompany,
    'add-criteria-box': AddEligibilityCriteria,
    'add-selection-round': AddSelectionRound,
    'edit-selection-roundBox': EditSelectionRounds,
    // 'category-education-modal': DraftEligibilityCriteriaModal,
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
    this.getDetails();
    this.$bus.$on('closeDescription', () => {
      this.showDesc = false;
    });
    this.$bus.$on('added-eligibility-criteria', () => {
      this.getDetails();
    });
    this.$bus.$on('close', () => {
      this.showOpenFor = false;
      this.getDetails();
    })
    this.$bus.$on('deleted', () => {
      this.getDetails();
    });
    // close-add-selection-round
    this.$bus.$on('close-add-selection-round', () => {
      this.showAddSelection = false;
      this.getDetails();
    })
    this.$bus.$on('edit-selection-roundbox', () => {
      this.getDetails();
    })
    // // close-selection-round
    // this.$bus.$on('close-selection-round', () => {
    //   this.showAddSelection = false;
    //   this.getDetails();
    // })
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
        if(response.status == 204) {
          let toast = this.$toasted.error("Criteria Deleted", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.getDetails();
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

  .columns.criteria-box {
    margin-top: 0;
    .column {
      padding-bottom: 0;
      padding-top: 0;
      margin-bottom: 0.5rem;
    }
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
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: solid 1px #ddd;
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

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .header-action.is-pulled-right {
      .button.is-white.delete-btn {
        margin-top: 0.3rem;
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
