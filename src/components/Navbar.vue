<template lang="html">
  <div class="navbar-page">

    <nav class="nav has-shadow">
      <div class="container">

        <div class="nav-left">
          <router-link class="nav-item" to="/">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'dashboard' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'jobprofile' }" class="nav-item is-tab is-hidden-mobile">Job Profile</router-link>
          <router-link :to="{ name: 'about' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>
        </div>

        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">

          <dropdown :title="userName" align="right">
            <a @click="editStudent = true">Account Settings</a><br>
            <a @click="logout">Logout</a>
          </dropdown>
          
          <ChangePasswordStudentModal @close="editStudent = false" v-if="editStudent"></ChangePasswordStudentModal>

        </div>
      </div>
    </nav>

  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import ChangePasswordStudentModal from '@/components/Student/ChangePasswordStudentModal'

export default {
  name: 'navbar',
  components: {
    Dropdown,
    ChangePasswordStudentModal
  },
  data() {
    return {
      editStudent: false
    };
  },
  methods: {
    logout() {
      this.$bus.$emit( 'logout' );
    },
  },
  props: {
    userName: {
      required: true
    }
  }
}
</script>

<style lang="scss">
.navbar-page {
    margin-bottom: 1.5rem;
}
</style>
