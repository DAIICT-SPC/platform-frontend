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
export default {
  name: 'company',
  components: {
    CompanyNavbar
  },
  created() {
    this.$bus.$on('logout', () => {
      Auth.destroyToken();
      this.$router.push({name: 'home'});
    });
  }
}
</script>

<style lang="scss">
.company-dashboard-page {

}
</style>
