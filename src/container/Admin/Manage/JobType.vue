<template>
  <div class="job-type-page">

    <div class="job-type box">

      <div class="job-title">
        <h2 class="title">Job Type</h2>
      </div>

      <div class="job-body">
        <div class="job-type-items" v-for="jobType,index in jobTypes">
          <span>{{ jobType.job_type }}</span>
          <a class="icon is-small" @click="deleteJobType(jobType.id)"> <i class="fa fa-trash-o"></i> </a>
        </div>
      </div>

      <div class="field is-grouped">
        <p class="control">
          <!-- <button class="button is-success add-button" v-on:click="showModal=true">+ Add Category</button> -->
        </p>
      </div>
      <div class="job-type-footer">
        <div class="field bottom">
          <p class="control">
            <input v-model="jobType" name="jobType" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('jobType') }" type="text" placeholder="Enter Job Type">
            <input v-model="duration" name="duration" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('duration') }" type="text" placeholder="Enter Duration">
          </p>
          <p class="control">
            <button class="button is-success" @click="addJobType">Add</button>
          </p>
        </div>

      </div>
    </div>



  </div>
</template>

<script>
import jobType from '@/api/jobType'

export default{
  name: 'job-type-page',
  created() {
    this.getAllJobTypes();
  },
  data() {
    return{
      jobTypes: [],
      jobType: '',
      duration: ''
    }
  },
  methods: {
    getAllJobTypes() {
      jobType.all().then((response) => {
  			this.jobTypes = response.data;
  		})
    },
    addJobType() {
      this.validate().then(() => {
        this.postJobTypeDetails();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deleteJobType(job_type_id) {
      jobType.deleteJobType(job_type_id)
      .then((response) => {
        this.getAllJobTypes();
      })
      .catch((error) => {
        console.log(error.response);
      })
    },
    postJobTypeDetails() {
      jobType.postJobType(this.jobType, this.duration)
      .then((response) => {
        if(response.status == 200){
          this.getAllJobTypes();
        }
      })
      .catch((error) => {
        console.log(error.response);
      })
    },
    validate() {
      return this.$validator.validateAll();
    }
  }
}
</script>

<style lang="scss">
.job-type-page {

  .job-title {
    border-bottom: solid 1px #ddd;
    padding: 1rem;
  }

  .job-body {
    padding: 1.5rem;
  }

  .job-type-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 200px;
    width: 100%;
    padding-bottom: 0.2rem;
  }



  .field.has-addons {
    padding-left: 1rem;
  }

  .field.bottom {
    padding-left: 1rem;
    max-width: 300px;
  }

  .job-type-footer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: solid 1px #ddd;
  }

  .field.is-grouped {
    margin: 0;
  }

  .control .input {
    margin-bottom: 0.4rem;
  }

}
</style>
