<template>
	<div class="placementSeason-component">
		<div class="main" v-if="showData">
			<span class="select is-fullwidth">
				<select v-validate="'required|not_in:null'" v-model="seasonId" @change="placementseasonChange()" name="placement-select">
					<option value=null>Select Dropdown</option>
					<option v-for="season in seasons" :value="season.id">{{season.title}}</option>
				</select>
			</span>
			<div class="help is-danger" v-show="errors.has('placement-select')">
				The Placement Season must be a valid value.
			</div>
		</div>
		<div v-if="!showData">
			<h1>No Data found</h1>
		</div>
	</div>
</template>

<script>
import placementSeason from '@/api/placementSeason';
import Auth from '@/packages/auth/Auth';

export default{
	name: 'placement-season-component',
	data() {
		return {
			seasons: [],
			seasonId: null,
			showData: true
		}
	},
	created() {
		this.getAllPlacementSeason();
	},
	methods: {
		getAllPlacementSeason() {
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
		placementseasonChange() {
			this.$bus.$emit('placementSeason', { id: this.seasonId });
		},
		getUserId() {
			return Auth.getUserToken();
		}
	}
}
</script>

<style lang="scss">
.placementSeason-component {

}
</style>
