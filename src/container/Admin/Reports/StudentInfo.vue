<template lang="html">
  <div class="student-info">
    <div class="header">
      <h2 class="title">Student Info</h2>
    </div>
    <div class="top-body">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Student ID</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <input v-validate="'required'" v-model="student_enroll" :class="{'input': true, 'is-danger': errors.has('enroll') }" name="enroll" type="number" placeholder="Student ID"
            @keyup.enter="validateAndGetStudentDetails">
          </div>
        </div>
      </div>

      <div class="field">
        <p class="has-text-centered">
          <button name="student" class="button is-success submit-button" @click="validateAndGetStudentDetails">
            Submit
          </button>
        </p>
      </div>
    </div>

    <div v-if="showData && showFailedData" class="main-body">
      <!-- <div class="data-header">
      <h2 class="title">{{student_enroll}}</h2>
    </div> -->

    <!-- success student -->

    <!-- non success student -->
    <div class="form" v-for="st, index in studentDetailsArray">
      <h1 class="title is-4">Company {{index+1}}</h1>
      <div class="field is-horizontal">
        <div class="field-label">
          <p>Job Title</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control" v-if="st.company">
              {{st.job_title}} for {{st.company.company_name}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Reached Till Round No</p>
        </div>
        <div class="field-body" v-if="st.student_reached_till_round">
          <div>
            <p class="control" v-if="st.student_reached_till_round.round_details == null">
              0 (Application)
            </p>
            <p class="control" v-else="st.student_reached_till_round.round_no">
              {{st.student_reached_till_round.round_no}}
              ({{st.student_reached_till_round.round_details.round_name}})
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <pre>
    {{studentDetailsArray}}
  </pre> -->
</div>





<div v-if="showData && showOfferData" class="main-body">
  <div class="form">
    <div class="field is-horizontal">
      <div class="field-label">
        <p>Enrollnment No</p>
      </div>
      <div class="field-body">
        <div>
          <p class="control">
            {{studentDetailsObject.enroll_no}}
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <p>Job Title</p>
      </div>
      <div class="field-body">
        <div>
          <p class="control">
            {{studentDetailsObject.placement.job_title}} for {{studentDetailsObject.placement.company.company_name}}
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <p>Package</p>
      </div>
      <div class="field-body">
        <div>
          <p class="control">
            {{studentDetailsObject.package}}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div v-if="!showData && !noData && !showFailedData" class="no-data">
  <h3 class="title">Sorry No Student Data Exists.</h3>
</div>
<div v-if="noData" class="no-data">
</div>
</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';
export default {
  name: 'student-info',
  created() {
    this.season_id = this.$route.params.season_id;
  },
  data() {
    return {
      season_id: null,
      placement_id: null,
      student_enroll: null,
      showData: false,
      studentDetailsArray: [],
      studentDetailsObject: {},
      placements: [],
      i: null,
      placementsID: [],
      placementsTitle: [],
      noData: true,
      showFailedData: false,
      showOfferData: false
    };
  },
  methods: {
    validateAndGetStudentDetails() {
      this.validate()
      .then(() => {
        admin.getStudentWiseReport(this.getUserId(), this.season_id, this.student_enroll)
        .then((response) => {
          console.log(response.data);
          // no data to display
          if(response.data.length == 0) {
            this.showData = false;
            this.noData = false;
          }
          else {
            // data to display
            this.showData = true;
            this.noData = false;
            if(Array.isArray(response.data) == true) {
              this.showFailedData = true;
              this.showOfferData = false;
              this.studentDetailsArray = response.data;
            }
            else
            {
              this.showFailedData = false;
              this.showOfferData = true;
              this.studentDetailsObject = response.data;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      })
    },
    validate() {
      return this.$validator.validateAll();
    },
    getUserId() {
      return Auth.getUserToken();
    },
  }
}
</script>

<style lang="scss">
.student-info {

  margin-bottom: 2rem;

  .header {
    padding: 1rem;
    padding-left: 1.5rem;
    border-bottom: solid 1px #ddd;
  }
  .top-body {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    display: flex;
    justify-content: flex-start;
    border-bottom: solid 1px #ddd;
  }
  .field.is-horizontal {
    margin-right: 1rem;
  }
  .field-label.is-normal {
    margin-right: 1rem;
    .label {
      width: 7rem;
    }
  }
  .field.is-grouped {
    max-width: 12rem;
  }
  .main-body {
    padding: 1rem;
    padding-top: 1.5rem;
    padding-left: 3rem;
    .field
    {
      border-bottom: solid 1px #ddd;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      .field-label
      {
        text-align: left;
        font-weight: bold;
      }
    }
  }

  .data-header {
    padding-bottom: 1rem;
    border-bottom: solid 1px #ddd;
    margin-bottom: 1rem;
  }

  .no-data {
    padding: 1rem;
  }
}
</style>
