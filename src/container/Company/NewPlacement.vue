<template lang="html">
  <div class="new-placement-page">
    <div class="container">
      <div class="columns" v-if="showData">
        <div class="column is-one-quarter">
          <company-sidebar></company-sidebar>
        </div>
        <div class="column is-auto">
          <div class="box">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div v-if="!showData">
        <div class="box">
          <h1 class="title">No Access</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import placementSeason from '@/api/placementSeason';
import Auth from '@/packages/auth/Auth';
import CompanySidebar from '@/components/CompanySidebar';

export default {
  name: 'new-placement-page',
  components: {
    CompanySidebar
  },
  created() {
    this.callPlacementSeasons();
  },
  data() {
    return {
      showData: true
    };
  },
  methods: {
    callPlacementSeasons() {
      placementSeason.all(this.getUserId())
      .then((response) => {
        if(response.data == 'No Placement Season Found!')
        {
          this.showData = false;
        }
        else {
          this.showData = true;
          this.seasons = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
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
  .title {
    padding: 1rem;
  }
}
</style>
