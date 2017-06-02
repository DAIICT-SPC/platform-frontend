<template lang="html">
  <div class="admin-dashboard">

    <admin-navbar></admin-navbar>

    <div class="admin-dashboard-inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import AdminNavbar from '@/components/AdminNavbar'
export default {
  name: 'admin-dashboard',
  components: {
    AdminNavbar
  },
  created() {
    // Listen for logout event
    this.$bus.$on('logout-admin', () => {
      Auth.destroyToken();
      this.$router.push({
        name: 'home'
      });
    });
  }
}
</script>

<style lang="scss">
.admin-dashboard {

}
</style>
