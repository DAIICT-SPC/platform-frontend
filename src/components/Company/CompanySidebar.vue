<template lang="html">
  <div class="card company-sidebar">
    <aside class="menu">
      <ul class="menu-list">

        <!-- Dummy Placement ID's 0 -->

        <li><router-link class="non-active" :to="{ name: 'placement-primary' }">
          Step 1: Placement Primary</router-link></li>
        <li><router-link class="non-active" :to="{ name: 'select-category', params: { placement_id: 0 } }">
          Step 2: Select Category</router-link></li>
        <li><router-link class="non-active" :to="{ name: 'select-round-details', params: { placement_id: 0 } }">
          Step 3: Select Round Details</router-link></li>
        <li><router-link class="non-active" :to="{ name: 'placement-criteria', params: { placement_id: 0 } }">
          Step 4: Placement Criteria</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'company-sidebar'
}
</script>

<style lang="scss">
.company-sidebar {
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  padding: 0.4rem;
  .non-active {
    pointer-events: none;
   cursor: default;
  }
}
</style>
