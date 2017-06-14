<template>
	<div class="placement-tiles-page">
		<div class="columns is-multiline">

			<!-- 1/3 col -->
			<div class="column is-one-third" v-if="showData" v-for="season in seasons_list">
				<div class="card placement-tiles">

					<header class="card-header">
						<p class="card-header-title">
							{{season.title}}
							<input type="hidden" v-model="placement_season_id = season.id"  />
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span v-if="season.status == 'open'" class="tag is-success status">{{season.status}}</span>
								<span v-if="season.status == 'closed'" class="tag is-light status">{{season.status}}</span>
							</span>
						</a>
					</header>

					<footer class="card-footer">
						<router-link :to="{ name: 'placed-students', params: { season_id: season.id } }" v-if="season.status != 'draft'" class="card-footer-item">View</router-link>
						<a v-if="season.status == 'open'" @click="closeSeason" class="card-footer-item">Close</a>
						<a v-if="season.status == 'draft' || season.status == 'closed'" @click="startSeason" class="card-footer-item">Start</a>
					</footer>
				</div>
			</div>
			<!-- 1/3 col -->

			<div class="column box" v-if="!showData">
				<h3 class="title">No Data to Show</h3>
			</div>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';

export default {
	name: 'placement-tiles-page',
	created() {
		this.getAllManagePlacements();
		this.$bus.$on('created-season', () => {
			this.getAllManagePlacements();
		});
	},
	data() {
		return {
			showData: false,
			seasons_list: [],
			placement_season_id: null
		};
	},
	methods: {
		getAllManagePlacements() {
			admin.getManagePlacementSeason()
			.then((response) => {
				if(response.data.length == 0) {
					this.showData = false;
				}
				else {
					this.showData = true;
					this.seasons_list = response.data;
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		startSeason() {
			admin.postStartSeason(this.placement_season_id)
			.then((response) => {
				if(response.status == 200) {
					this.getAllManagePlacements();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		closeSeason() {
			admin.postCloseSeason(this.placement_season_id)
			.then((response) => {
				if(response.status == 200) {
					this.getAllManagePlacements();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
	}
}
</script>

<style lang="scss">
.placement-tiles-page {

	.placement-tiles {
		margin-top: 0rem;
		border-radius: 4px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
	}

	.status {
		margin-right: 0.9rem;
	}

	.card-header-icon {
		padding-right: 1rem;
	}
}
</style>
