<template>
	<div class="placement-seasons-admin-home">
		<div class="container dashboard-admin">

			<div class="columns is-multiline">
				<!-- 1/3 col -->
				<div class="column is-one-third" v-for="season in placementsSeasons">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								{{ season.title }}
							</p>
							<a class="card-header-icon">
								<span class="icon">
									<span class="tag is-success status">{{season.status}}</span>
								</span>
							</a>
						</header>
						<footer class="card-footer">
							<router-link :to="{ name: 'placements-in-seasons', params: { season_id: season.id } }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->



			</div>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'

export default {
	name: 'placement-seasons-admin-home',
	created() {
		this.callDashboard();
	},
	data() {
		return {
			placementsSeasons: [],
		};
	},
	methods: {
		callDashboard() {
			admin.adminDashboard()
			.then((response) => {
				// console.log(response.data);
	      this.placementsSeasons = response.data;
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
