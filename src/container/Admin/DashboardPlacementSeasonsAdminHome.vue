<template>
	<div class="placement-seasons-admin-home">
		<div class="container dashboard-admin">

			<div class="columns is-multiline">
				<!-- 1/3 col -->
				<div class="column is-one-third" v-if="showData" v-for="season in placementsSeasons">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								{{ season.title }}
							</p>
							<a class="card-header-icon">
								<span class="icon">
									<span v-if="season.status == 'open'" class="tag is-success status">{{season.status}}</span>
									<span v-if="season.status == 'closed'" class="tag is-light status">{{season.status}}</span>
								</span>
							</a>
						</header>
						<footer class="card-footer">
							<router-link :to="{ name: 'placements-in-seasons', params: { season_id: season.id } }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->

				<div class="column box" v-if="!showData">
					<h3 class="title">No Data to Show</h3>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';

export default {
	name: 'placement-seasons-admin-home',
	created() {
		this.callDashboard();
	},
	data() {
		return {
			showData: false,
			placementsSeasons: [],
		};
	},
	methods: {
		callDashboard() {
			admin.adminDashboard()
			.then((response) => {
				if(response.data.length == 0) {
					this.showData = false;
				}
				else {
					this.showData = true;
					this.placementsSeasons = response.data;
				}
	    })
	    .catch((error) => {
	      console.log(error);
	    });
		}
	}
}
</script>

<style lang="scss">
.placement-seasons-admin-home {

	.box {
		padding: 1rem;
		margin-top: 0.8rem;
		border-radius: 4px;
		box-shadow: 0px 4px 5px #d0cfcf;
	}

	.container.dashboard-admin {
		padding: 0;
		margin-top: 1.3rem;
	}

	.column .card{
		border-radius: 4px;
		box-shadow: 0px 4px 5px #d0cfcf;
	}
	.tag.is-success, .is-info{
		padding-bottom: 3px;
	}

	.icon {
		padding-right: 25px;
	}
}
</style>
