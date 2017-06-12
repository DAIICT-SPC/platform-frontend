<template lang="html">
  <div class="company-navbar-page">
    <!-- navbar starts -->
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link class="nav-item" :to="{name:'company-home'}">
            <img src="../../images/daiict.jpg" alt="daiict"> &nbsp; DA-IICT
          </router-link>
          <router-link :to="{ name: 'company-home' }" class="nav-item is-tab is-hidden-mobile">Home</router-link>
          <router-link :to="{ name: 'placement-primary' }" class="nav-item is-tab is-hidden-mobile">New Placement Drive</router-link>
          <router-link :to="{ name: 'manage-drafts' }" class="nav-item is-tab is-hidden-mobile">Manage</router-link>
          <router-link :to="{ name: 'company-profile' }" class="nav-item is-tab is-hidden-mobile">My Profile</router-link>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <!-- <div class="nav-item is-tab" @click="logout"><a class="button">Logout!</a></div> -->
          <dropdown :title="userName" align="right">
            <a @click="editCompany = true">Account Settings</a><br>
            <a @click="logout">Logout</a>
          </dropdown>
          <edit-company-modal @close="editCompany = false" v-if="editCompany"></edit-company-modal>
        </div>
      </div>
    </nav>
    <!-- navbar ends -->
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import EditCompanyPersonalModal from '@/components/Company/EditCompanyPersonalModal'
export default {
  name: 'company-navbar',
  components: {
    Dropdown,
    'edit-company-modal': EditCompanyPersonalModal
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
      editCompany: false
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

}
</style>
