<template lang="html">
  <div class="company-navbar-page">

    <nav class="nav has-shadow">
      <div class="container">

        <div class="nav-left">
          <router-link class="nav-item" :to="{name:'company-home'}">
            <img src="../../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'company-home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'placement-primary' }" class="nav-item is-tab is-hidden-mobile">New Placement Drive</router-link>
          <router-link :to="{ name: 'manage-drafts' }" class="nav-item is-tab is-hidden-mobile">Manage</router-link>
          <router-link :to="{ name: 'company-profile' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>
        </div>

        <span @click="toggle = !toggle" class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div class="nav-right nav-menu">
          <dropdown :title="userName" align="right">
            <a @click="editCompany = true">Account Settings</a><br>
            <a @click="logout">Logout</a>
          </dropdown>
          <ChangeCompanyPasswordModal @close="editCompany = false" v-if="editCompany"></ChangeCompanyPasswordModal>
        </div>

      </div>
    </nav>

  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import ChangeCompanyPasswordModal from '@/components/Company/ChangeCompanyPasswordModal'
export default {
  name: 'company-navbar',
  components: {
    Dropdown,
    ChangeCompanyPasswordModal
  },
  props: {
    userName: {
      required: true
    }
  },
  creted() {
    console.log(this.userName);
  },
  data() {
    return {
      editCompany: false,
      toggle: false
    };
  },
  methods: {
    logout() {
      this.$bus.$emit('logout');
    }
  }
}
</script>

<style lang="scss">
.company-navbar-page {
    margin-bottom: 1.5rem;
}
</style>
