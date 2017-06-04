<template lang="html">
  <div class="company-dashboard-page">
    <company-navbar ></company-navbar>
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
    this.getCompanyDetails();
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    },
    getCompanyDetails() {
      company.getUserDetails(this.getUserId()).then((response) => {
        this.companyDetails = response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
      })
    }
  }
}
</script>

<style lang="scss">
.company-dashboard-page {

}
</style>
