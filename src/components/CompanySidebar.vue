<template lang="html">
  <div class="card company-sidebar">
    <aside class="menu">
      <ul class="menu-list">
        <li><router-link :to="{ name: 'placement-primary' }">Step 1: Placement Primary</router-link></li>
        <li><router-link :to="{ name: 'select-category' }">Step 2: Select Category</router-link></li>
        <li><router-link :to="{ name: 'select-round-details' }">Step 3: Select Round Details</router-link></li>
        <li><router-link :to="{ name: 'placement-criteria' }">Step 4: Placement Criteria</router-link></li>
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
}
</style>
