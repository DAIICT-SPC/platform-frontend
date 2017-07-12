<template>
	<div class="placement-season-manage box">
		<div class="heading-top">

			<div class="placement-season-manage-head" v-if="showData">
				<div class="head">
					<h3 class="title">Manage</h3>
				</div>
				<div class="field has-addons">
					<p class="control is-fullwidth">
						<input v-model="title" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('season') }"
						@keyup.enter="createSeason" type="text" name="season" placeholder="Create New Placement Season">
					</p>
					<p class="control">
						<a class="button is-success" @click="createSeason"> Submit </a>
					</p>
				</div>
			</div>


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
							<a v-if="season.status == 'open'" @click="closeSeason(season.id)" class="card-footer-item">Close</a>
							<a v-if="season.status == 'draft' || season.status == 'closed'" @click="startSeason(season.id)" class="card-footer-item">Start</a>
						</footer>
					</div>
				</div>
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
							<a v-if="season.status == 'open'" @click="closeSeason(season.id)" class="card-footer-item">Close</a>
							<a v-if="season.status == 'draft' || season.status == 'closed'" @click="startSeason(season.id)" class="card-footer-item">Start</a>
						</footer>
					</div>
				</div>

			</div>
			<div class="column box" v-if="!showData">
				<h3 class="title">No Data to Show</h3>
			</div>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';

export default {
	name: 'placement-season-manage',
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
			placement_season_id: null,
			title: ''
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
		startSeason(season_id) {
			admin.postStartSeason(season_id)
			.then((response) => {
				if(response.status == 200) {
					let toast = this.$toasted.success("Season Started", {
						theme: "outline",
						position: "top-center",
						duration : 3000
					});
					this.getAllManagePlacements();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		closeSeason(season_id) {
			admin.postCloseSeason(season_id)
			.then((response) => {
				if(response.status == 200) {
					let toast = this.$toasted.show("Season Ended", {
						theme: "outline",
						position: "top-center",
						duration : 3000
					});
					this.getAllManagePlacements();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},

		createSeason() {
			this.validate().then(() => {
				this.createPlacementSeason();
			})
			.catch((error) => {
				console.log(error);
			})
		},
		createPlacementSeason() {
			admin.createSeason(this.title)
			.then((response) => {
				if(response.status	== 200) {
					let toast = this.$toasted.success("Placement Successfully Created", {
						theme: "outline",
						position: "top-center",
						duration : 3000
					});
					this.$bus.$emit('created-season');
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		validate() {
			return this.$validator.validateAll();
		},

	}
}
</script>

<style lang="scss">
.placement-season-manage {

	.placement-season-manage-head {
		border-bottom: solid 1px #ddd;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: auto;
		.field {
			margin-right: 1rem;
			.input {
				width: 15rem;
			}
		}
	}

	.columns {
		margin: 1rem;
		padding-bottom: 1rem;
		.column {
			padding: 0;
			margin: 0.5rem;
		}
	}



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
