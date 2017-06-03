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
            <input v-model="name" v-validate="'required'" name="ed" class="input" :class="{'input': true, 'is-danger': errors.has('ed') }" type="text" placeholder="Enter New Education">
          </p>
          <p class="control">
            <a class="button is-success" @click="addEducation"> Add Education </a>
          </p>
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
  beforeUpdate() {
    education.all().then((response) => {
      this.education = response.data;
    })
  },
  created() {
    education.all().then((response) => {
      this.education = response.data;
    })
  },
  data() {
    return{
      education: [ ],
      name: ''
    }
  },
  methods: {
    addEducation() {
      this.validate().then(() => {
        this.addEdHere();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    addEdHere() {
      education.postEducation(this.name)
      .then((response) => {
        if(response.status == 200){
          alert('Education Added Successfully');
          this.name = "";
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

}
</style>
