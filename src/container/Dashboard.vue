<template lang="html">
  <div class="dashboard">
    <navbar></navbar>

  <div class="dashboard-inner">
    <router-view></router-view>
  </div>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'dashboard',
  components: {
    Navbar
  }
}
</script>

<style lang="css">
html, body {
  min-height: 100%;
  background: #fafcfd;
  /*background: #f5f5f5*/
}
.dashboard{
  margin-bottom: 20px;
}

.dashboard-inner {
  margin-top: 20px;
}
</style>
