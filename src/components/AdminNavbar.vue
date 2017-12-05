<template lang="html">
  <div class="admin-navbar">
    <nav class="nav has-shadow">
      <div class="container">

        <div class="nav-left">
          <router-link class="nav-item" :to="{name:'admin-home'}">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'admin-home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'placement-season-manage' }" class="nav-item is-tab is-hidden-mobile">Manage</router-link>
          <router-link :to="{ name: 'admin-profile' }" class="nav-item is-tab is-hidden-mobile">Profile</router-link>
        </div>

        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="nav-right nav-menu">
          <dropdown :title="userName" align="right">
            <a @click="editAdmin = true">Account Settings</a><br>
            <a @click="logout">Logout</a>
          </dropdown>

          <ChangeAdminPasswordModal @close="editAdmin = false" v-if="editAdmin"></ChangeAdminPasswordModal>

        </div>

      </div>
    </nav>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';
import ChangeAdminPasswordModal from '@/components/Admin/ChangeAdminPasswordModal';

export default {
  name: 'admin-navbar',
  components: {
    Dropdown,
    ChangeAdminPasswordModal
  },
  props: {
    userName: {
      required: true
    }
  },
  data() {
    return {
      editAdmin: false
    };
  },
  created() {},
  methods: {
    logout() {
      this.$bus.$emit( 'logout-admin' );
    }
  }
}
</script>

<style lang="scss">
.admin-navbar {

    margin-bottom: 1.5rem;

}
</style>
