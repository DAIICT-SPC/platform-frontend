<template lang="html">
  <div class="new-placement-page">
    <div class="container">
      <div class="columns">
        <div class="column is-one-quarter">
          <placement-sidebar></placement-sidebar>
        </div>
        <div class="column is-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlacementDriveSidebar from '@/components/Admin/PlacementDriveSidebar';
export default {
  name: '',
  components: {
    'placement-sidebar': PlacementDriveSidebar
  },
  created() {

  }
}
</script>

<style lang="css">
</style>
