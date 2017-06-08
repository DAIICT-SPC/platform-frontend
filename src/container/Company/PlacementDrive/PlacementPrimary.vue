<template>

  <div class="placement-primary">

    <h4 class="title placement-header">COMPANY DETAILS</h4>

    <div class="placement-body">
      <div class="field">
        <label class="label">Placement Season</label>
        <p class="control">
          <placementseason-dropdown></placementseason-dropdown>
        </p>
      </div>

      <div class="field">
        <label class="label">Job Title</label>
        <p class="control">
          <input v-validate="'required'" name="jobTitle" placeholder="Job Title" v-model="placementDrive.jobTitle" type="text" class="input">
        </p>
        <div v-show="errors.has('jobTitle')" class="help is-danger">
          {{ errors.first('jobTitle') }}
        </div>
      </div>

      <div class="field">
        <label class="label">Job Profile Description</label>
        <p class="control">
          <textarea v-validate="'required'" v-model="placementDrive.jobProfileDescription" name="job_desc" class="textarea" placeholder="Job Description"></textarea>
        </p>
        <div v-show="errors.has('job_desc')" class="help is-danger">
          {{ errors.first('job_desc') }}
        </div>
      </div>

      <div class="date-time">
        <div class="field">
          <label class="label">Last Date of Registration</label>
          <p class="control is-fullwidth">
            <datepicker placeholder="Date" :config="{ dateFormat: 'Y-m-d', static: true }"
            v-model="placementDrive.lastDateofRegistration" name="date"></datepicker>
          </p>
        </div>
        <div class="field time">
          <label class="label">Time</label>
          <p class="control">
            <input v-model="placementDrive.time" type="time" name="time" class="input" placeholder="Enter Date">
          </p>
        </div>
      </div>

      <div class="field">
        <label class="label">Location</label>
        <p class="control">
          <input v-validate="'required'" type="text" placeholder="Enter Location" class="input" name="location" v-model="placementDrive.loaction">
        </p>
        <div v-show="errors.has('location')" class="help is-danger">
          {{ errors.first('location') }}
        </div>
      </div>

      <div class="field">
        <label class="label">No of Students</label>
        <p class="control">
          <input v-validate="'required'" type="number" placeholder="No of students" name="numberOfStudents" class="input" v-model="placementDrive.noOfStudents">
        </p>
        <div v-show="errors.has('numberOfStudents')" class="help is-danger">
          {{ errors.first('numberOfStudents') }}
        </div>
      </div>

      <div class="field">
        <label class="label">Package</label>
        <p class="control">
          <input v-validate="'required|numeric'" type="number" placeholder="Enter Package" class="input" name="package" v-model="placementDrive.package">
        </p>
        <div v-show="errors.has('package')" class="help is-danger">
          {{ errors.first('package') }}
        </div>
      </div>


      <div class="field">
        <label class="label">Job Type</label>
        <p class="control">
          <jobtype-dropdown></jobtype-dropdown>
        </p>
        <div v-show="errors.has('jobType-select')" class="help is-danger">
          {{ errors.first('jobType-select') }}
        </div>
      </div>


      <div class="field is-grouped">
        <p class="control buttons">
          <button class="button is-primary" @click="validateAndSendPlacementDetails">Submit</button>
          <!-- <button class="button is-primary" @click="moveToNextRound">Next</button> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import company from '@/api/company'
import Datepicker from 'vue-bulma-datepicker'
import JobTypeDropdown from '@/components/JobTypeDropdown'
import PlacementSeasonDropdown from '@/components/PlacementSeasonDropdown'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'placement-drive',
  components:{
    Datepicker,
    'jobtype-dropdown': JobTypeDropdown,
    'placementseason-dropdown': PlacementSeasonDropdown
  },
  data() {
    return {
      placementDrive: {
        seasonId: null,
        jobTitle: '',
        jobProfileDescription: '',
        lastDateofRegistration: '',
        time: '',
        dateTime: '',
        loaction: '',
        noOfStudents: '',
        package: null,
        jobTypeId: null
      }
      // isError: false
    }
  },
  created() {
    {
      this.$bus.$on('jobType', (jobType) => {
        this.placementDrive.jobTypeId = jobType.id;
      });
    }
    {
      this.$bus.$on('placementSeason', (placement) => {
        this.placementDrive.seasonId = placement.id;
      });
    }
  },
  methods: {
    validateAndSendPlacementDetails() {
      this.validate()
      .then(this.saveAndSendPlacementDetails())
      .catch(() => {
        console.log("Error");
      });
    },
    validate() {
      return this.$validator.validateAll();
    },
    saveAndSendPlacementDetails() {
      this.dateTime = this.placementDrive.lastDateofRegistration + " " + this.placementDrive.time + ':00';
      company.placementPrimary(this.getUserId(), this.placementDrive.jobTitle, this.placementDrive.jobProfileDescription,
      this.dateTime, this.placementDrive.loaction, this.placementDrive.noOfStudents,
      this.placementDrive.package, this.placementDrive.jobTypeId, this.placementDrive.seasonId)
      .then((response) => {
        this.moveToNextRound(response.data.placement_id);
      })
      .catch((error) => {
        // this.isError = true;
        console.log(error);
      })
    },
    moveToNextRound(placement_id) {
      // condition if placement created then only let the company move ahead.
      this.$router.push({
        name: 'select-category',
        params: {
          placement_id: placement_id
        }
      })
    },
    emptyFields() {
      this.placementDrive.seasonId = null,
      this.placementDrive.jobTitle = '',
      this.placementDrive.jobProfileDescription = '',
      this.placementDrive.lastDateofRegistration = '',
      this.placementDrive.loaction = '',
      this.placementDrive.noOfStudents = '',
      this.placementDrive.package = null,
      this.placementDrive.jobTypeId = null
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.placement-primary {

  .date-time {
    display: flex;
    justify-content:  flex-start;
    .field.time {
      padding-left: 1rem;
    }
  }

  .title.placement-header {
    border-bottom: solid 1px #ddd;
    margin-bottom: 0;
    padding: 1rem;
  }

  .placement-body {
    padding: 1rem;
  }
}
</style>
