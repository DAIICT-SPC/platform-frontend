<template lang="html">
  <div class="company-dashboard-page">
    <company-navbar :userName="userName"></company-navbar>
    <div class="dashboard-inner">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import CompanyNavbar from '@/components/CompanyNavbar'
import company from '@/api/company'
export default {
  name: 'company',
  components: {
    CompanyNavbar
  },
  data() {
    return {
      userDetails: {},
      userName: ''
    }
  },
  created() {
    this.getCompanyDetails();
    this.$bus.$on('logout', () => {
      let toast = this.$toasted.success("Successfully Logged Out", {
        theme: "outline",
        position: "bottom-center",
        duration : 3000
      });
      Auth.destroyToken();
      this.$router.push({name: 'home'});
    });
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    },
    getCompanyDetails() {
      company.getUserDetails(this.getUserId())
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
        console.log(error);
      })
    },
  }
}
</script>

<style lang="scss">
.company-dashboard-page {

}
</style>
