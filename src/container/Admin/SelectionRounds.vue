<template lang="html">
	<div class="selection-rounds">
		<div class="box">
			<div v-if="showData">
				<div class="selection-header">
					<h3 class="title">Applicants <span class="subtitle">(Remaining)</span></h3>
					<button class="button is-success">View Full-List</button>
				</div>

				<div class="selection-body" v-for="studentData in remainingStudents">
					<input v-model="selectedStudents" :value="studentData.enroll_no" type="checkbox" name="checkbox" class="checkbox">
					<span class="enroll title is-4">{{ studentData.enroll_no }}</span>
					<span class="name title is-4">{{ studentData.user.name }}</span>
					<span class="category title is-4">{{ studentData.category.name }}</span>
					<a class="is-success view-profile"> View Profile </a>
				</div>

				<div class="selection-checkbox">
					<input type="checkbox" class="checkbox" />
					<span class="text title is-4">Select All</span>
				</div>

				<div class="selection-footer">
					<router-link :to="{ name: 'placements-drive-description', params: { placement_id: placement_id } }" class="button is-primary back-button">Back</router-link>
					<a class="button is-primary applicant-button" @click="moveStudentsToNextRound">Move to next round</a>
					<a class="button close-btn">Close</a>
				</div>
			</div>
			<div v-if="!showData && !allStudents">
				<h3 class="title no-data">No Student has applied yet!</h3>
			</div>
			<div class="allow" v-if="allStudents">
				<h3 class="title no-data">All Students moved to next Round</h3>
				<button class="button is-success">View Full-List</button>
			</div>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'selection-rounds',
	created() {
		// console.log(this.$route.params);
		this.placement_id = this.$route.params.placement_id;
		this.season_id = this.$route.params.season_id;
		this.getRemainingStudents();
	},
	data() {
		return {
			placement_id: null,
			season_id: null,
			remainingStudents: [],
			showData: false,
			selectedStudents: [],
			allStudents: false
		};
	},
	methods: {
		getRemainingStudents() {
			admin.getRemainingStudentsInApplication(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data == 'None has applied yet!'){
					this.showData = false;
				}
				else if(response.data == 'All Students move to Rounds'){
					this.showData = false;
					this.allStudents = true;
				}
				else {
					this.showData = true;
					this.remainingStudents = response.data;
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		moveStudentsToNextRound() {
			admin.postAdminMoveToFirstRound(this.getUserId(), this.placement_id, this.selectedStudents)
			.then((response) => {
				if(response.status == 200) {
					this.getRemainingStudents();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			// getRemainingStudentsInApplication
			return Auth.getUserToken();
		}
	},
}
</script>

<style lang="scss">
.selection-rounds {

	.allow {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.button {
			margin-right: 1rem;
		}
	}

	.title {
		margin-bottom: 0;
	}

	.selection-header {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		margin: auto;
		border-bottom: solid 1px #ddd;
		margin-bottom: 1rem;
	}

	.checkbox {
		margin-right: 0.5rem;
	}

	.enroll {
		margin-right: 0.5rem;
	}

	.name {
		margin-right: 0.5rem;
	}

	.modal-card-title {
		padding-top: 5px;
	}

	.selection-body {
		padding: 0.5rem;
		margin-left: 1rem;
		padding-right: 2.2rem;
		// border-bottom: solid 1px #ddd;
	}

	.view-profile {
		float: right;
	}

	.selection-checkbox {
		padding: 0.5rem;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 0.5rem;
		border-top: solid 1px #ddd;
	}

	.selection-footer {
		border-top: solid 1px #ddd;
		padding: 1rem;
		margin-top: 1rem;
	}

	.no-data {
		padding: 1rem;
	}

}
</style>
