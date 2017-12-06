<template>
<div class="job-type-page">

  <div class="job-title">
    <h2 class="title">Job Type</h2>
  </div>

  <div class="job-body" v-if="!noData">
    <div class="job-type-items" v-for="jobType,index in jobTypes">
      <span>{{ jobType.job_type }}</span>
      <a class="icon is-small" @click="askForDeleteJobType(jobType.id)"> <i class="fa fa-trash-o"></i> </a>
    </div>
  </div>

  <div class="noData" v-if="noData">
    <h3 class="title">No Job Types has been created yet!</h3>
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
</template>

<script>
import jobType from '@/api/jobType'

export default {
  name: 'job-type-page',
  created() {
    this.getAllJobTypes();
  },
  data() {
    return {
      jobTypes: [],
      jobType: '',
      duration: '',
      noData: false
    }
  },
  methods: {
    getAllJobTypes() {
      jobType.all().then( ( response ) => {
        if ( response.data.length == 0 ) {
          this.noData = true;
        } else {
          this.noData = false;
          this.jobTypes = response.data;
        }
      } )
    },
    addJobType() {
      this.validate().then( () => {
          this.postJobTypeDetails();
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
    askForDeleteJobType( job_type_id ) {
      this.swal( {
        // title: 'Are you sure?',
        text: "Delete the Job Category?",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#428aff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: true
      } ).then( () => {
        this.deleteJobType( job_type_id );
      } )
    },
    deleteJobType( job_type_id ) {
      jobType.deleteJobType( job_type_id )
        .then( ( response ) => {
          this.getAllJobTypes();
        } )
        .catch( ( error ) => {
          console.log( error.response );
        } )
    },
    postJobTypeDetails() {
      jobType.postJobType( this.jobType, this.duration )
        .then( ( response ) => {
          if ( response.status == 200 ) {
            this.getAllJobTypes();
          }
        } )
        .catch( ( error ) => {
          console.log( error.response );
        } )
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
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .job-body {
        padding: 1rem;
    }

    .job-type-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 200px;
        width: 100%;
        padding-bottom: 0.2rem;
    }

    .field.bottom {
        max-width: 300px;
    }

    .job-type-footer {
        border-top: solid 1px #ddd;
        padding: 1rem;
    }

    .control .input {
        margin-bottom: 0.4rem;
    }

    .noData {
        padding: 1rem;
    }

}
</style>
