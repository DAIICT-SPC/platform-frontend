<template lang="html">
  <div class="new-placement-page">
    <div class="container">
      <div class="columns">
        <div class="column is-one-quarter">
          <company-sidebar></company-sidebar>
        </div>
        <div class="column is-auto">
          <div class="box">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanySidebar from '@/components/CompanySidebar'
export default {
  name: 'new-placement-page',
  components: {
    CompanySidebar
  }
}
</script>

<style lang="scss">
.new-placement-page {
  margin: 1.3rem;
  .box{
    padding: 0;
    border-radius: 4px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>
