<template lang="html">
  <div class="academic-tab">
    <div v-if="showEducation">

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
            <a class="button is-white" @click="showModal = true">Edit</a>
            <modal @close="showModal = false" v-if="showModal" :userEd="userEd"></modal>
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
            <a class="button is-white">Edit</a>
          </footer>
        </div>

      </div>

    </div>
    <div v-if="!showEducation">
      <h3 class="title">No Education to show</h3>
    </div>
  </div>
</template>

<script>
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'
import EditEducationModal from '@/components/EditEducationModal'

export default {
  name: 'academic',
  components: {
    'modal' : EditEducationModal
  },
  props: {
    userEducationDetails: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      userEducation: { },
      showEducation: false,
      showModal: false
    }
  },
  created() {
    user.getUserEducation(this.getUserId()).then((response) => {
      this.userEducation = response.data;
      if(this.userEducation.length == 0) {
        // alert('Enter Educations Details');
        this.showEducation = false;
      }
      else {
        this.showEducation = true;
      }
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

    .button.is-white {
      margin-top: 6px
    }


  }
}
</style>
