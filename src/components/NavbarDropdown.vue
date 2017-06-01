<template lang="html">
  <select name="category" @change="actionPerform" class="navbar-dropdown">
    <option class="option" value=null>User Name</option>
    <option class="option" value="logout">Logout</option>
  </select>
</template>

<script>
import category from '@/api/category'

export default {
  name: 'navbar-dropdown',
  methods: {
    actionPerform(){
      this.$bus.$emit('logout');
    }
  }
}
</script>

<style lang="scss">
.navbar-dropdown {
  .option {

  }
}

</style>
