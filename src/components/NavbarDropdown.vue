<template lang="html">
  <div>
    <select name="navbar-dropdown" @change="actionPerform" class="navbar-dropdown">
      <option class="option" value=null>User Name</option>
      <option class="option" value="logout">Logout</option>
    </select>
  </div>
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
