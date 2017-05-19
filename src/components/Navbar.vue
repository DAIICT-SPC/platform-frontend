<template lang="html">
  <div class="hello">
    <!-- navbar starts -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item" to="/">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
        <router-link :to="{ name: 'Home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
        <router-link :to="{ name: 'JobProfile' }" class="nav-item is-tab is-hidden-mobile">Job Profile</router-link>
        <router-link :to="{ name: 'About' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>

        </div>
        <span class="nav-toggle">
          <span></span>
        <span></span>
        <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab">Username</a>
        </div>
      </div>
    </nav>
    <!-- navbar ends -->

    <router-view></router-view>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
html, body {
  height: 100%;
  /*background: #fafcfd;*/
  background: #f5f5f5
}
</style>
