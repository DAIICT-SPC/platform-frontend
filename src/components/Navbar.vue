<template lang="html">
  <div>
    <!-- navbar starts -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item" to="/">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'dashboard' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'JobProfile' }" class="nav-item is-tab is-hidden-mobile">Job Profile</router-link>
          <router-link :to="{ name: 'About' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab" @click="logout">Logout!</a>
        </div>
      </div>
    </nav>
    <!-- navbar ends -->
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods:{
    logout(){
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="css">
  
</style>
