<template>
  <div class="myprofile-page">

    <div class="category box">

      <div class="cat-title">
        <h2 class="title">Job Type</h2>
      </div>

      <div class="cat-body">
        <ul class="category-items">
          <li v-for="jobType,index in jobTypes">{{index+1}}) {{ jobType.job_type }}</li>
        </ul>
      </div>

      <div class="field is-grouped">
        <p class="control">
          <!-- <button class="button is-success add-button" v-on:click="showModal=true">+ Add Category</button> -->
        </p>
      </div>
      <div>
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
  name: 'myprofile',
  created() {
    jobType.all().then((response) => {
			this.jobTypes = response.data;
		})
  },
  beforeUpdate() {
    jobType.all().then((response) => {
			this.jobTypes = response.data;
		})
  },
  data() {
    return{
      jobTypes: [],
      jobType: '',
      duration: ''
    }
  },
  methods: {
    addJobType() {
      this.validate().then(() => {
        this.postJobTypeDetails();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    postJobTypeDetails() {
      jobType.postJobType(this.jobType, this.duration)
      .then((response) => {
        if(response.status == 200){
          alert('Category Added Successfully');
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
.myprofile-page{

  .cat-title {
    border-bottom: solid 1px #ddd;
  }

  .cat-body {
    padding: 1.5rem;
  }

  li {
    padding-bottom: 0.2rem;
  }

  .field.has-addons {
    padding-left: 1rem;
  }

  .field.bottom {
    padding-left: 1rem;
    max-width: 300px;
  }


  .control .input {
    margin-bottom: 0.4rem;
  }

}
</style>
