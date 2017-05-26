<template lang="html">
  <div class="dashboard">

    <navbar></navbar>

    <div class="dashboard-inner">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import Navbar from '@/components/Navbar'

export default {
  name: 'dashboard',
  components: {
    Navbar
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
html, body {
  min-height: 100%;
  background: #fafcfd;
}

.dashboard{
  margin-bottom: 20px;
  .dashboard-inner {
    margin-top: 20px;
  }
}

</style>
