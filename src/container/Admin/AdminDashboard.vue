<template lang="html">
  <div class="admin-dashboard">

    <admin-navbar :userName="userName"></admin-navbar>

    <div class="admin-dashboard-inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import AdminNavbar from '@/components/AdminNavbar';
import admin from '@/api/admin';

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
      let toast = this.$toasted.show("Successfully Logged Out", {
        theme: "outline",
        position: "bottom-center",
        duration : 3000
      });
      this.$router.push({
        name: 'home'
      });
    });
  },
  methods: {
    getAdminDetails() {
      admin.getAdminDetails(this.getUserId())
      .then((response) => {
        this.userName = response.data.name;
        let toast = this.$toasted.success("Welcome Back, " + this.userName, {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
        this.userDetails = response.data;
      })
      .catch((error) => {
        if(error.response.status == 500) {
					let toast = this.$toasted.error("Please Logout and come back again to continue.", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
				}
				else {
					console.log(error);
				}
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
    margin-top: 1.5rem;
  }
}
</style>
