<template>
	<div class="placementSeason-component">
		<span class="select is-fullwidth">
			<select v-validate="'required|not_in:null'" v-model="seasonId" @change="placementseasonChange()" name="placement-select">
				<option value=null>Select Dropdown</option>
				<option v-for="season in seasons" :value="season.id">{{season.title}}</option>
			</select>
		</span>
		<div class="help is-danger" v-show="errors.has('placement-select')">
			{{errors.first('placement-select')}}
		</div>
	</div>
</template>

<script>
import placementSeason from '@/api/placementSeason'
export default{
	name: 'placement-season-component',
	data() {
		return {
			seasons: [],
			seasonId: null
		}
	},
	created() {
		placementSeason.all().then((response) => {
			this.seasons = response.data;
		})
	},
	methods: {
		placementseasonChange() {
			this.$bus.$emit('placementSeason', { id: this.seasonId });
		}
	}
}
</script>

<style lang="scss">
.placementSeason-component {

}
</style>
