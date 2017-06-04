<template lang="html">
  <div class="admin-navbar">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item" to="/">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'admin-home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'create-new-placement' }" class="nav-item is-tab is-hidden-mobile">Start Placement Season</router-link>
          <router-link :to="{ name: 'admin-profile' }" class="nav-item is-tab is-hidden-mobile">Profile</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <!-- <div class="nav-item is-tab" @click="logout"><a class="button">Logout!</a></div> -->
          <dropdown title="User" align="right">
            <a @click="logout">Logout</a>
          </dropdown>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
export default {
  name: 'admin-navbar',
  components: {
    Dropdown
  },
  methods: {
    logout() {
      this.$bus.$emit('logout-admin');
    }
  }
}
</script>

<style lang="scss">
.admin-navbar {
 .container {
   padding: 0;
 }
}
</style>
