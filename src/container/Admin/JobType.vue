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
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="Find a repository">
          </p>
          <p class="control">
            <a class="button is-success"> Add Job Type </a>
          </p>
        </div>
        <div class="help is-danger" v-show="errors.has('season')">
          {{errors.first('season')}}
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
  data() {
    return{
      jobTypes: [],
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

}
</style>
