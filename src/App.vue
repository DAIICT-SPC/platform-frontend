<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "../node_modules/bulma/sass/utilities/initial-variables";

@import "./scss/variables";

// 4. Import the rest of Bulma
@import "../node_modules/bulma/bulma";
</style>
