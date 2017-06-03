<template lang="html">
  <div class="company-dashboard-page">
    <company-navbar></company-navbar>
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
      companyDetails: {}
    }
  },
  created() {
    this.$bus.$on('logout', () => {
      Auth.destroyToken();
      this.$router.push({name: 'home'});
    });
    company.getUserDetails(this.getUserId()).then((response) => {
      this.companyDetails = response.data;
      console.log(this.companyDetails);
    })
    .catch((error) => {
      console.log(error.response.status);
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
.company-dashboard-page {

}
</style>
