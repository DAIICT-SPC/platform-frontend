<template>
<div class="new-placement-season">
  <div class="placement-page">
    <div class="container ">

      <div class="tabs">
        <ul>
          <li>
            <router-link :to="{ name: 'placement-season-manage' }">Placement Seasons</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'show-add-categories' }">Categories</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'show-add-jobtypes' }">Job Types</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'show-add-education' }">Education</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'add-users' }">Add Users</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'login-records' }">Login Records</router-link>
          </li>
        </ul>
      </div>

      <router-view></router-view>

    </div>
  </div>
</div>
</template>

<script>
import admin from '@/api/admin';
export default {
  name: 'new-placement-season',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.new-placement-season {

    .container.placement-page {
        padding-top: 0;
    }

}
</style>
