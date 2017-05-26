<template lang="html">
  <div class="container profile-page">
    <!-- is-narrow-mobile -->
    <div class="columns">
      <!-- is-hidden-mobile card is-narrow is-one-quarter-mobile -->
      <div class="column is-one-quarter">

        <sidebar :user="user"></sidebar>

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
            <router-view :user="user"></router-view>
          </div>
        </div>
      </div>

    </div> <!-- main div -->
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import User from '@/stubs/user'

export default {
  name: 'myprofile',
  data() {
    return {
      user: User
    };
  },
  components: {
    'sidebar' : Sidebar
  }
}
</script>

<style lang="scss">
.container {

  .profile-box {
    padding: 0;
    border-radius: 4px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }

  .profile-box .profile-tabs {
    margin-bottom: 0;
  }

  .profile-box .profile-tab-content {
    padding: 1.5rem 2rem;
  }

  .profile-image {
    padding: 1rem;
    padding-bottom: 0;
    img {
      border-radius: 4px;
    }
  }

  .main-content{
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

}

</style>
