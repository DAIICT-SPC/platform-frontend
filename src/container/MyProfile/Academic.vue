<template lang="html">
  <div class="academic-tab">

    <div class="section-top">
      <h2 class="title">Current Course</h2>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Information Technology
          </p>
          <span class="academic-year">May 2012 - Mar 2016</span>
        </header>
        <div class="card-content">
          <div class="content">
             Information Technology, <br>
             <br>
            3AX12ED042087 | 2018 Passout Batch <br>
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item"> CPI</span>
          <span class="card-footer-item">71% Score</span>
        </footer>
      </div>
    </div>


    <div class="section-bottom">

      <h2 class="title">Previous Education</h2>

      <div class="card" v-for="userEd in userEducationDetails">
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

    user.getUserEducation().then((response) => {
      this.userEducation = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
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
