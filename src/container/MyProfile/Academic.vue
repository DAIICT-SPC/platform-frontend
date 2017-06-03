<template lang="html">
  <div class="academic-tab">

    <div class="section-top">
      <h2 class="title">Current Course</h2>

      <div class="card" v-if="index == 0" v-for="userEd,index in userEducationDetails">
        <header class="card-header">
          <p class="card-header-title">
            {{ userEd.clg_school }}
          </p>
          <span class="academic-year">{{ userEd.start_year.slice(0, 4) }} - {{ userEd.end_year.slice(0, 4) }}</span>
        </header>
        <div class="card-content">
          <div class="content">
            No Board<br>
            Senior Secondary Certificate
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">{{ userEd.cpi }} CPI</span>
        </footer>
      </div>
    </div>


    <div class="section-bottom">

      <h2 class="title">Previous Education</h2>

      <div class="card" v-if="index != 0" v-for="userEd,index in userEducationDetails">
        <header class="card-header">
          <p class="card-header-title">
            {{ userEd.clg_school }}
          </p>
          <span class="academic-year">{{ userEd.start_year.slice(0, 4) }} - {{ userEd.end_year.slice(0, 4) }}</span>
        </header>
        <div class="card-content">
          <div class="content">
            No Board<br>
            Senior Secondary Certificate
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">{{ userEd.cpi }} CPI</span>
        </footer>
      </div>

    </div>

  </div>
</template>

<script>
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'
export default {
  name: 'academic',
  props: {
    userEducationDetails: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      userEducation: { }
    }
  },
  created() {

    user.getUserEducation(this.getUserId()).then((response) => {
      this.userEducation = response.data;
      // console.log(this.userEducationDetails[0]);
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.academic-tab {

  .academic-year {
    padding: 1rem;
  }

  .section-bottom {
    margin-top: 1rem;

    .card {
      margin-top: 1rem;
    }

  }
}
</style>
