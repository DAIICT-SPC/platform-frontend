<template lang="html">
  <div class="container profile-page">
    <div class="columns" v-if="error.errorStatus == null">
      <div class="column is-one-quarter">
        <sidebar :userMainDetails="userMainDetails" :userEducationcpi="userEducationcpi"></sidebar>
      </div>
      <div class="column is-auto">
        <div class="profile-box box col-2-tab">
          <div class="tabs profile-tabs">
            <ul>
              <li><router-link :to="{name:'about'}">About</router-link></li>
              <li><router-link :to="{ name: 'academic' }">Academic Details</router-link></li>
              <li><router-link :to="{ name: 'resume' }">Resume</router-link></li>
            </ul>
          </div>
          <div class="profile-tab-content">
            <router-view :userEducationDetails="userEducationDetails" :userMainDetails="userMainDetails"></router-view>
          </div>
        </div>
      </div>

    </div> <!-- main div -->
    <div class="column is-full error" v-if="error.errorStatus != null">
      <div class="media media-card">
        There are no posts to follow.
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import userApi from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'myprofile',
  props: {
    userDetails: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      userEducationcpi: null,
      userEducationDetails: [],
      userMainDetails: {},
      error: {
        errorMessage: '',
        errorStatus: null
      }
    }
  },
  components: {
    'sidebar': Sidebar
  },
  created() {
    this.userMainDetails = this.userDetails;
    // console.log("Profile Page");
    // console.log(this.userMainDetails);
    userApi.getUserEducation(this.getUserId()).then((response) => {
      this.userEducationcpi = response.data[0].cpi;
      this.userEducationDetails = response.data;
    })
    .catch((error) => {
      if (error.response) {
        this.error.errorMessage = error.response.data.message;
        this.error.errorStatus = error.response.status;
        alert(this.error.errorStatus + " - " + this.error.errorMessage);
      } else if (error.request) {
        alert(error.request);
      } else {
        alert('Error', error.message);
      }
      // console.log(error.config);
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
.container {

  .profile-box {
    padding: 0;
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  }

  .profile-box .profile-tabs {
    margin-bottom: 0;
  }

  .profile-box .profile-tab-content {
    padding: 1.5rem 2rem;
  }

  .profile-image {
    padding: 1rem 1rem 0;
    img {
      border-radius: 4px;
    }
  }

  .main-content {
    margin-top: 20px;
  }

  .profile-meta {
    font-size: 0.9rem;
  }

  .profile-info .info {
    margin-bottom: 1rem;
    .content-value {
      display: block;
      color: #3273dc;
    }
    .content-label {
      font-size: 0.8rem;
    }
  }

  .column.error {
    margin: 0;
  }

}
</style>
