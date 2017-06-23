<template lang="html">
  <div class="placement-season-dropdown">
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="placement_id" @change="placementChange" name="PlacementSeasonDropdown" >
        <option value=null>Select Placement</option>
        <option v-for="placement in placementsInSeason" :value="placement.placement_id">
          {{placement.job_title}} for {{placement.company.company_name}}
        </option>
      </select>
      <!-- <pre> -->
        <!-- placement_id -->
        <!-- job_title for company.company_name-->
        <!-- {{ placementsInSeason }} -->
      <!-- </pre> -->
    </span>
  </div>
</template>

<script>
export default {
  name: 'placement-season-dropdown',
  props: {
    placementsInSeason: {
      required: true
    }
  },
  data() {
    return {
      placement_id: null
    };
  },
  methods: {
    placementChange() {
      this.$bus.$emit('placement-change', { placement_id: this.placement_id });
    }
  }
}
</script>

<style lang="scss">
.placement-season-dropdown {

}
</style>
