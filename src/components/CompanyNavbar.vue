<template lang="html">
  <div class="company-navbar-page">
    <!-- navbar starts -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item" to="/">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'company-home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'placement-primary' }" class="nav-item is-tab is-hidden-mobile">New Placement Drive</router-link>
          <router-link :to="{ name: 'company-profile' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>
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
    <!-- navbar ends -->
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
export default {
  name: 'company-navbar',
  components: {
    Dropdown
  },
  methods: {
    logout() {
      this.$bus.$emit('logout');
    }
  }
}
</script>

<style lang="scss">
.company-navbar-page {

}
</style>
