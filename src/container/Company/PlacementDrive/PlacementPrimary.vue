<template>
  <div class="placement-drive">
    <h2 class="title placement-header">COMPANY DETAILS</h2>

    <div class="placement-body">
      <div class="field">
        <label class="label">Job Title</label>
        <p class="control">
          <input v-validate="'required|alpha'" type="text" name="jobTitle" placeholder="Job Title" class="input" v-model="placementDrive.jobTitle">
        </p>
        <div class="help is-danger" v-show="errors.has('jobTitle')">{{ errors.first('jobTitle') }}</div>
      </div>

      <div class="field">
        <label class="label">Job Profile Discription</label>
        <p class="control">
          <textarea class="textarea" placeholder="Enter Job Profile Discription" v-model="placementDrive.jobProfileDescription"></textarea>
        </p>
      </div>

      <div class="field">
        <label class="label">Last Date of Registration</label>
        <p class="control is-fullwidth">
          <!-- <datepicker placeholder="Date" :config="{ dateFormat: 'Y-m-d', static: true }"
          v-model="placementDrive.lastDateofRegistration"></datepicker> -->
        </p>
      </div>

      <div class="field">
        <label class="label">Location</label>
        <p class="control">
          <input type="text" placeholder="Enter Location" class="input" v-model="placementDrive.loaction">
        </p>
      </div>

      <div class="field">
        <label class="label">No of Students</label>
        <p class="control">
          <input type="number" placeholder="No of students" class="input" v-model="placementDrive.noOfStudents">
        </p>
      </div>

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">PackageMin</label>
            <p class="control">
              <input type="number" placeholder="Enter CTC" class="input" v-model="placementDrive.packageMin">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">PackageMax</label>
            <p class="control">
              <input type="number" placeholder="Enter CTC" class="input" v-model="placementDrive.packageMax">
            </p>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Type</label>
        <p class="control">
          <span class="select is-fullwidth">
            <select v-model="placementDrive.type">
              <option value="">Select Dropdown</option>
              <option>Summer Internship</option>
              <option>Internship</option>
              <option>Job</option>
              <option>Internship + Job</option>
            </select>
          </span>
        </p>
      </div>

      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary">Submit</button>
        </p>
      </div>
    </div>
    <!-- <pre>
    {{ $data }}
  </pre> -->
</div>
</template>

<script>
// import Datepicker from 'vue-bulma-datepicker'
export default {
  name: 'hello',
  components:{
    // Datepicker
  },
  data(){
    return{
      placementDrive: {
        jobTitle: '',
        jobProfileDescription: '',
        lastDateofRegistration: '',
        loaction: '',
        noOfStudents: '',
        packageMin: 0,
        packageMax: 0,
        type: ''
      }
    }
  }
}
</script>

<style lang="scss">
.placement-drive{


  // .box{
  //   padding: 0;
  //   border-radius: 4px;
  //   box-shadow: 0px 4px 5px #d0cfcf;
  //   max-width: 600px;
  //   width: 100%;
  //   margin: auto;
  // }
  //
  // .title.placement-header {
  //   border-bottom: solid 1px #ddd;
  //   margin-bottom: 0;
  //   padding: 1rem;
  // }
  //
  // .placement-body{
  //   padding: 1rem;
  // }
}
</style>
