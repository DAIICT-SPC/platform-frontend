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
            <input v-validate="'required'" v-model="student_enroll" :class="{'input': true, 'is-danger': errors.has('enroll') }" name="enroll" type="number" placeholder="Student ID">
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Placement ID</label>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <!-- dropdown for placements name -->
            <input v-validate="'required'" v-model="placementsTitle" :class="{'input': true, 'is-danger': errors.has('placement_id') }" name="placement_id" type="text" placeholder="Placement ID"
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
    <div v-if="showData" class="main-body">
      <div class="form">
        <div class="field is-horizontal">
          <div class="field-label">
            <p>Enrollnment Number</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{studentDetails.enroll_no}}
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
              <p class="control ">
                {{studentDetails.package}}
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
              <p class="control ">
                {{studentDetails.placement.job_title}}
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <p>Company Name</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                {{studentDetails.placement.company.company_name}}
              </p>
            </div>
          </div>
        </div>
      </div>
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
    admin.getPlacementsInSeasons(this.season_id)
    .then((response) => {
      this.placements = response.data;
      console.log(this.placements);
      for(this.i = 0; this.i < this.placements.length; this.i++) {
        // console.log(this.placements[this.i].placement_id);
        this.placementsID = this.placements[this.i].placement_id;
        console.log(this.placementsID);
        // console.log(this.placements[this.i].placement_season.title);
        this.placementsTitle = this.placements[this.i].placement_season.title;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
      season_id: null,
      placement_id: null,
      student_enroll: null,
      showData: false,
      studentDetails: '',
      placements: [],
      i: null,
      placementsID: [],
      placementsTitle: []
    };
  },
  methods: {
    validateAndGetStudentDetails() {
      this.validate()
      .then(() => {
        admin.getStudentWiseReport(this.getUserId(), this.placement_id, this.student_enroll)
        .then((response) => {
          if(response.data.length == 0) {
            // no data to display
            this.showData = false;
          }
          else {
            // data to display
            this.showData = true;
            this.studentDetails = response.data;
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
    getStudentWiseReport() {
      // admin.getStudentWiseReport()
      // .then((response) => {
      // })
      // .catch((error) => {
      // 	console.log(error);
      // })
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
}
</style>
