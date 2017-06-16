<template>
	<div class="placement-season-tiles">

		<div class="company-header">
			<h2 class="title"> {{ company_name }}</h2>
		</div>

		<div class="columns is-multiline">

			<!-- 1/3 col -->
			<div class="column is-one-third" v-for="placements in placement_details">
				<div class="card placement-tiles">
					<header class="card-header">
						<p class="card-header-title">
							{{ placements.job_title }}
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span class="tag is-success status">{{placements.status}}</span>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							Package:&nbsp;<b>{{ placements.package }}</b><br>
							Location:&nbsp;<b>{{ placements.location }}</b>
						</div>
					</div>
					<footer class="card-footer">
						<router-link :to="{ name: 'placements-drive-description', params: { placement_id: placements.placement_id } }" class="card-footer-item">View</router-link>
					</footer>
				</div>
			</div>
			<!-- 1/3 col -->


			<!-- <router-view></router-view> -->
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'

export default {
	name: 'placement-tiles-page',
	data() {
		return {
			season_id: null,
			company_id: null,
			company_name: '',
			placement_details: [],
		};
	},
	created() {
		this.season_id = this.$route.params.season_id;
		this.company_id = this.$route.params.company_id;
		this.getCompanywisePlacements();
	},
	methods: {
		// getCompanywisePlacement
		getCompanywisePlacements() {
			admin.getCompanywisePlacement(this.season_id, this.company_id)
			.then((response) => {
				this.company_name = response.data[0].company.company_name;
				this.placement_details = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		}

	}
}
</script>

<style lang="scss">
.placement-season-tiles {
	.placement-tiles{
		margin-top: 0rem;
		border-radius: 4px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
	}

	.company-header {
		border-bottom: solid 1px #ddd;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
	}

	.status{
		margin-right: 2rem;
	}
}
</style>
