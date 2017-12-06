<template>
<div class="company-wise-listing">
  <div class="box">

    <div v-if="showData">
      <div class="company-wise head" v-if="showData">
        <h2 class="title">Companies Wise Listing</h2>
      </div>

      <div class="companywise-body">
        <div class="one-company" v-for="company in companies">
          <span class="text title is-4">{{ company.company_name }}</span>
          <router-link :to="{ name: 'companywise-placement-cards',
					params: { company_id: company.id } }" class="a-tag">
            View
          </router-link>
        </div>

      </div>
    </div>

    <div class="null" v-if="!showData">
      <h3 class="title">No Companies have been Allowed yet.</h3>
    </div>
  </div>
</div>
</template>

<script>
import admin from '@/api/admin'

export default {
  name: 'company-wise-listing',
  data() {
    return {
      placement_season_id: null,
      companies: [],
      showData: false
    }
  },

  created() {
    this.placement_season_id = this.$route.params.season_id;
    this.getCompanyAllowedList();
  },

  methods: {
    redirect() {
      this.$router.push( {
        name: 'placement-tiles'
      } );
    },
    getCompanyAllowedList() {
      admin.getCompanywisePlacementListing( this.placement_season_id )
        .then( ( response ) => {
          if ( response.data.length == 0 ) {
            this.showData = false;
          } else {
            this.showData = true;
            this.companies = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    }
  }
}
</script>

<style lang="scss">
.company-wise-listing {

    max-width: 450px;

    .company-wise-listing.box {
        padding: 0;
    }

    .company-wise {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .companywise-body {
        padding: 1.5rem;
    }

    .one-company {
        width: 90%;
        padding: 0.5rem;
        border-bottom: solid 1px #ddd;
        .text {
            padding-left: 5px;
        }
    }

    .a-tag {
        float: right;
        height: 32px;
        padding-top: 3px;
    }

    .null {
        padding: 1rem;
    }

}
</style>
