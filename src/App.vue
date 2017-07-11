<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
  }
}
</script>

<style lang="scss">
@import "../node_modules/bulma/sass/utilities/initial-variables";

@import "./scss/variables";

// 4. Import the rest of Bulma
@import "../node_modules/bulma/bulma";
@import "node_modules/sweetalert2/dist/sweetalert2";
</style>
