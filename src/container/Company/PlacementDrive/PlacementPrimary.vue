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
          <input type="text" name="jobTitle" placeholder="Job Title" class="input" v-model="placementDrive.jobTitle">
        </p>
      </div>

      <div class="field">
        <label class="label">Job Profile Description</label>
        <p class="control">
          <textarea v-model="placementDrive.jobProfileDescription" name="temp_address" class="textarea" placeholder="Job Description"></textarea>
        </p>
      </div>

      <div class="field">
        <label class="label">Last Date of Registration</label>
        <p class="control is-fullwidth">
          <datepicker placeholder="Date" :config="{ dateFormat: 'Y-m-d', static: true }"
          v-model="placementDrive.lastDateofRegistration" name="date"></datepicker>
        </p>
      </div>

      <div class="field">
        <label class="label">Location</label>
        <p class="control">
          <input type="text" placeholder="Enter Location" class="input" name="location" v-model="placementDrive.loaction">
        </p>
      </div>

      <div class="field">
        <label class="label">No of Students</label>
        <p class="control">
          <input  type="number" placeholder="No of students" name="numberOfStudents" class="input" v-model="placementDrive.noOfStudents">
        </p>
      </div>

      <div class="field">
        <label class="label">Package</label>
        <p class="control">
          <input type="number" placeholder="Enter CTC" class="input" name="package" v-model="placementDrive.package">
        </p>
      </div>


      <div class="field">
        <label class="label">Job Type</label>
        <p class="control">
          <jobtype-dropdown></jobtype-dropdown>
        </p>
      </div>


      <div class="field is-grouped">
        <p class="control buttons">
          <button class="button is-primary" @click="saveAndSendPlacementDetails">Save And New</button>
          <button class="button is-primary" @click="moveToNextRound">Next</button>
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
        loaction: '',
        noOfStudents: '',
        package: 0,
        jobTypeId: null
      },
      isError: false
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
    saveAndSendPlacementDetails(){
      company.placementPrimary(this.placementDrive.jobTitle, this.placementDrive.jobProfileDescription,
        this.placementDrive.lastDateofRegistration, this.placementDrive.loaction, this.placementDrive.noOfStudents,
        this.placementDrive.package, this.placementDrive.jobTypeId, this.placementDrive.seasonId)
        .then((response) => {
          alert('Placement Created Successfully.');
          console.log(response);
        })
        .catch((error) => {
          isError = true;
          console.log(error);
        })
    },
    moveToNextRound() {
      // condition if placement created then only let the company move ahead.
      this.$router.push({
        name: 'select-category'
      })
    }
  }
}
</script>

<style lang="scss">
.placement-primary {

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
