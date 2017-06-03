<template>
  <div class="myprofile-page">

    <div class="category box">

      <div class="cat-title">
        <h2 class="title">Education</h2>
      </div>

      <div class="cat-body">
        <ul class="category-items">
          <li v-for="ed,index in education">{{index+1}}) {{ ed.name }}</li>
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
            <a class="button is-success"> Add Education </a>
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
import education from '@/api/education'

export default{
  name: 'myprofile',
  created() {
    education.all().then((response) => {
      this.education = response.data;
    })
  },
  data() {
    return{
      education: [ ]
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
