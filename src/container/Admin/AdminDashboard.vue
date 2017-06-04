<template lang="html">
  <div class="admin-dashboard">

    <admin-navbar :userName="userName"></admin-navbar>

    <div class="admin-dashboard-inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import AdminNavbar from '@/components/AdminNavbar'
import admin from '@/api/admin'

export default {
  name: 'admin-dashboard',
  components: {
    AdminNavbar
  },
  data() {
    return {
      userDetails: { },
      userName: ''
    };
  },
  created() {
    this.getAdminDetails();
    // Listen for logout event
    this.$bus.$on('logout-admin', () => {
      Auth.destroyToken();
      this.$router.push({
        name: 'home'
      });
    });
  },
  methods: {
    getAdminDetails() {
      admin.getAdminDetails(this.getUserId())
      .then((response) => {
        console.log(response);
        this.userDetails = response.data;
        this.userName = response.data.name;
      })
      .catch((error) => {
        console.log(error.message);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.admin-dashboard {
  .admin-dashboard-inner {
    margin-top: 1rem;
  }
}
</style>
