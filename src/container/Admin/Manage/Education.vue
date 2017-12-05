<template>
<div class="education-page">

  <div class="education-title">
    <h2 class="title">Education</h2>
  </div>

  <div class="education-body">
    <div class="education-items" v-for="ed,index in education">
      <span>{{ ed.name }}</span>
      <a class="icon is-small" @click="askForDeleteEducation(ed.id)"> <i class="fa fa-trash-o"></i> </a>
    </div>
  </div>

  <div class="add-education">
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
</template>

<script>
import education from '@/api/education'

export default {
  name: 'myprofile',
  created() {
    this.getAllEducation();
  },
  data() {
    return {
      education: [],
      name: ''
    }
  },
  methods: {
    getAllEducation() {
      education.all().then((response) => {
        this.education = response.data;
      })
    },
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
          if (response.status == 200) {
            this.getAllEducation();
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
    },
    askForDeleteEducation(education_id) {
      this.swal({
        // title: 'Are you sure?',
        text: "Delete the Education?",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#428aff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: true
      }).then(() => {
        this.deleteEducation(education_id);
      })
    },
    deleteEducation(education_id) {
      education.deleteEducation(education_id)
        .then((response) => {
          this.getAllEducation();
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
.education-page {

    .education-title {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .education-body {
        padding: 1rem;
    }

    .education-items {
        max-width: 200px;
        width: 100%;
        padding-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .field.is-grouped {
        margin: 0;
    }

    .add-education {
      padding: 1rem;
      border-top: solid 1px #ddd;
    }

}
</style>
