<template>
	<div class="placement-season-tiles">
		<div class="columns is-multiline">

			<div class="column is-half" v-if="showData" v-for="drive in drives">
				<div class="card placement-tiles">
					<header class="card-header">
						<p class="card-header-title">
							{{ drive.company.company_name }}
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span v-if="drive.status == 'closed'" class="tag is-light status">{{ drive.status }}</span>
								<span v-if="drive.status == 'application'" class="tag is-success status">{{ drive.status }}</span>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							Job Title:&nbsp;<b>{{ drive.job_title }}</b><br>
							Location:&nbsp;<b>{{ drive.location }}</b>
						</div>
					</div>
					<footer class="card-footer">
						<router-link :to="{ name: 'placements-drive-description', params: { placement_id: drive.placement_id } }" class="card-footer-item">View</router-link>
					</footer>
				</div>
			</div>

			<div class="" v-if="!showData">
				<h3 class="title box">No Posts to follow. Kindly move back and select Placement Season Again</h3>
			</div>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
	export default {
		name: 'placement-tiles-page',
		data() {
			return {
				placement_id: null,
				drives: [],
				showData: false,
				placement_season_id: null
			};
		},
		created() {
			this.placement_id = this.$route.params.season_id;
			if(this.placement_id == null){
				this.showData = false;
			}
			else {
				this.showData = true;
			}
			this.funcPlacementSeasons();
		},
		methods: {
			funcPlacementSeasons() {
				admin.getPlacementsInSeasons(this.placement_id)
				.then((response) => {
					if(response.data.length == 0) {
						this.showData = false;
					}
					else {
						this.showData = true;
						this.drives = response.data;
					}
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

		.title.box {
			margin-top: 1rem;
			padding: 1rem;
		}

		.status{
			margin-right: 2rem;
		}

		.card-header-icon {
			padding-right: 19px
		}
	}
</style>
