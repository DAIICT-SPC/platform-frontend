<template lang="html">
  <div class="admin-student-preview">

    <a @click="hidden = true" class="is-success view-profile" v-if="!hidden"> View Profile </a>

    <div class="modal is-active" v-if="hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Preview</p>
          <button class="delete" @click="hidden=false"></button>
        </header>
        <section class="modal-card-body">

          <h2 class="title">{{studentData.user.name}}</h2>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Student Id</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{studentData.enroll_no}}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Programe Name</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{studentData.category.name}}
                </p>
              </div>
            </div>
          </div>

          <h2 class="title education">Education</h2>
          <div class="education-body">

          <div class="field is-horizontal" v-for="education,index in studentDetailEducation">
            <div class="field-label" v-if="index == 0">
              <p>Current</p>
            </div>
            <div class="field-label" v-if="index != 0">
              <p>Previous</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{education.clg_school}}
                </p>
              </div>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{education.cpi}} CPI
                </p>
              </div>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{education.start_year.slice(0, 4)}} - {{education.end_year.slice(0, 4)}}
                </p>
              </div>
            </div>
          </div>

        </div>

        </section>
        <footer class="modal-card-foot">
          <a class="button" @click="hidden=false">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default {
  name: 'admin-student-preview',
  created() {
    this.getStudentDetail();
  },
  props: {
    studentData: {
      required: true
    }
  },
  data() {
    return {
      studentDetailEducation: {},
      hidden: false
    };
  },
  methods: {
    getStudentDetail() {
      admin.getStudentDetail(this.getUserId(), this.studentData.enroll_no)
      .then((response) => {
        console.log(response.data.education);
        this.studentDetailEducation = response.data.education;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.admin-student-preview {

  .modal-card-head {
    padding: 1rem;
  }

  .modal-card-body {
    padding: 1rem;
    padding-top: 0.5rem;
    .title {
      padding-top: 1rem;
    }
    .education {
      border-top: solid 1px #ddd;
      margin-top: 1rem;
    }
    .education-body {
      padding-left: 1rem;
    }
  }

  .modal-card-foot {
    padding: 1rem;
  }

}
</style>
