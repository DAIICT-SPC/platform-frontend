<template lang="html">
  <div class="placement-seasons-drive-admin">
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
  name: 'placement-seasons-drive-admin',
  components: {
    'placement-sidebar': PlacementDriveSidebar
  },
  created() {

  }
}
</script>

<style lang="scss">
.placement-seasons-drive-admin {

}
</style>
