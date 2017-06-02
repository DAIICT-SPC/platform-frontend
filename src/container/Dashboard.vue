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
  data() {
    return {
      userName: ''
    }
  },
  created() {
    user.getUserDetails(this.getUserId())
    .then((response) => {
      this.userName = response.data.name;
      console.log(this.userName);
    })
    .catch((error) => {
      console.log(error);
    })
    // Listen for logout event
    this.$bus.$on('logout', () => {
      Auth.destroyToken();
      this.$router.push({
        name: 'home'
      });
    });
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
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
