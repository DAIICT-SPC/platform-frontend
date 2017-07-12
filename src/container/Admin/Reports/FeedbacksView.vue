<template>
	<div class="feeedbacks">

		<div class="header">
			<div class="title-header">
				<span class="title">Placement Name:</span>
			</div>
			<placement-season-dropdown :placementsInSeason="placementsInSeason"></placement-season-dropdown>
		</div>

		<div class="body" v-if="!noFeedback">
			<div v-for="feeds in feedback">
				<div class="company" v-if="feeds.company_name">
					<div class="body-title">
						<h3 class="title">Company Feedback</h3>
					</div>

					<div class="card">
						<div class="card-content">
							<p class="title main-title">
								“{{feeds.description}}”
							</p>
							<p class="subtitle">
								<StarRating :read-only=true v-model="feeds.rating" :max-rating="5" :star-size="15" :show-rating=false></StarRating>
							</p>
							<div class="foot">
								<p class="subtitle">
									by {{feeds.company_name}}
								</p>
							</div>
						</div>
						<footer class="card-footer">
							<p class="card-footer-item">
								<feedback-read-modal :key="feeds.user_id" :name="feeds.company_name" :description="feeds.description"
								:rating="feeds.rating"></feedback-read-modal>
							</p>
						</footer>
					</div>
				</div>
			</div>

			<div class="body-title" v-if="stuFeedback">
				<h3 class="title">Student Feedback</h3>
			</div>

			<div class="columns is-multiline">
				<div class="column is-one-third" v-if="feeds.enroll_no" v-for="feeds in feedback">
					<div class="card">
						<div class="card-content">
							<p class="title main-title-stu">
								“{{feeds.description}}”
							</p>
							<p class="subtitle">
								<StarRating :read-only=true v-model="feeds.rating" :max-rating="5" :star-size="15" :show-rating=false></StarRating>
							</p>
							<div class="foot">
								<p class="subtitle">
									by {{feeds.name}}
								</p>
							</div>
						</div>
						<footer class="card-footer">
							<p class="card-footer-item">
								<feedback-read-modal :key="feeds.user_id" :name="feeds.name" :description="feeds.description"
								:rating="feeds.rating"></feedback-read-modal>
							</p>
						</footer>
					</div>
				</div>


			</div>
		</div>
		<!-- <pre>{{feedback}}</pre> -->

		<div v-if="noFeedback" class="noFeedback">
			<h3 class="title">No Feedbacks given</h3>
		</div>


	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';
import PlacementSeasonDropdown from '@/components/Admin/PlacementSeasonDropdown';
import FeedbackReadModal from '@/components/Admin/FeedbackReadModal';
import StarRating from 'vue-star-rating';

export default{
	name: 'feeedbacks',
	components: {
		'placement-season-dropdown': PlacementSeasonDropdown,
		'feedback-read-modal': FeedbackReadModal,
		StarRating
	},
	created() {
		this.season_id = this.$route.params.season_id;
		this.season();
		this.$bus.$on('placement-change', (response) => {
			this.placement_id = response.placement_id;
			this.getFeedbackByPlacementId();
		});
	},
	data() {
		return {
			season_id: null,
			placementsInSeason: [],
			placement_id: null,
			noFeedback: true,
			feedback: [],
			stuFeedback: false,
			feedbackReadModal: false
		};
	},
	methods: {
		season() {
			admin.getPlacementsInSeasons(this.season_id)
			.then((response) => {
				this.placementsInSeason = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getFeedbackByPlacementId() {
			admin.getFeedbackByPlacementId(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data == "No Feedback") {
					this.noFeedback = true;
				}
				else {
					this.noFeedback = false;
					this.feedback = response.data;
					this.stuFeedback = false;
					if(response.data[0].enroll_no) {
						this.stuFeedback = true;
					}
					if(response.data[1].enroll_no) {
						this.stuFeedback = true;
					}
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			return Auth.getUserToken();
		}
	}
}
</script>

<style lang="scss">
.feeedbacks {
	padding-bottom: 1rem;
	margin-bottom: 2rem;

	.header {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: solid 1px #ddd;
		.title-header {
			padding-right: 1rem;
		}
	}

	.body {
		.body-title {
			padding: 1rem;
			border-bottom: solid 1px #ddd;
		}
		.card {
			.main-title {
				white-space: nowrap;
				width: 11em;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.main-title-stu {
				white-space: nowrap;
				width: 9em;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			margin: 1rem;
			max-width: 25rem;
		}
	}

	.subtitle {
		margin-bottom: 0;
	}

	.noFeedback {
		padding: 1rem;
		padding-bottom: 0;
	}

	.column {
		padding-bottom: 0;
	}

	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
