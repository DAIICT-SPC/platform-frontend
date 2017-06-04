<template lang="html">
  <div class="dashboard">

    <navbar :userName="userName"></navbar>

    <div class="dashboard-inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import Navbar from '@/components/Navbar'
import user from '@/api/user'

export default {
  name: 'dashboard',
  components: {
    Navbar
  },
  created() {
    this.getStudentDetails();
    // Listen for logout event
    this.$bus.$on('logout', () => {
      Auth.destroyToken();
      this.$router.push({
        name: 'home'
      });
    });
  },
  data() {
    return {
      userName: '',
      userDetails: { }
    }
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    },
    getStudentDetails() {
      user.getUserDetails(this.getUserId())
      .then((response) => {
        this.userDetails = response.data;
        this.userName = response.data.name;
      })
      .catch((error) => {
        console.log(error.message);
      })
    }
  }
}
</script>

<style lang="scss">
body,
html {
    min-height: 100%;
    background: #fafcfd;
}

.dashboard {
    margin-bottom: 20px;
    .dashboard-inner {
        margin-top: 1rem;
    }
}
</style>
