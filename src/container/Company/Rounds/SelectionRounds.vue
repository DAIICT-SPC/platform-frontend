<template lang="html">
	<div class="container company-application-selection-rounds">
		<div class="box">
			<div v-if="showData">
				<div class="selection-header">
					<h3 class="title">Applicants <span class="subtitle">(Remaining)</span></h3>
					<button @click="showModal = true" class="button is-success">View Full-List</button>
				</div>

				<application-list-modal @close="showModal = false" v-if="showModal == true"></application-list-modal>

				<div v-for="studentData in remainingStudents">
					<div class="company-application-selection-body" v-if="studentData.user">
						<div class="part1">
							<input v-model="selectedStudents" :value="studentData.enroll_no" type="checkbox" name="checkbox" class="checkbox">
							<span class="enroll">{{ studentData.enroll_no }}</span>
							<span class="name">{{ studentData.user.name }}</span>
							<span class="category">{{ studentData.category.name }}</span>
						</div>
						<div class="part2 student-preview">
							<student-preview :key="studentData.enroll_no" :studentData="studentData"></student-preview>
						</div>
					</div>
				</div>

				<div class="selection-checkbox">
					<input type="checkbox" class="checkbox" v-model="selectAll" />
					<span class="text">Select All</span>
				</div>

				<div class="selection-footer">
					<router-link :to="{ name: 'view-placement-detail', params: { placement_id: placement_id } }" class="button is-primary back-button">Back</router-link>
					<a class="button is-primary applicant-button" @click="moveStudentsToNextRound">Move to next round</a>
				</div>
			</div>
			<div v-if="!showData && !allStudents">
				<h3 class="title no-data">No Student has applied yet!</h3>
			</div>
			<div class="allow" v-if="allStudents">
				<h3 class="title no-data">All Students moved to next Round</h3>
				<button @click="showModal = true" class="button is-success">View Full-List</button>
				<application-list-modal @close="showModal = false" v-if="showModal == true"></application-list-modal>
			</div>
		</div>
		<!-- <a href="D:\A\platform-backend\public\test.zip" download>Path</a> -->
	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import ApplicationFullList from '@/components/Company/ApplicationFullList';
import StudentPreviewModal from '@/components/Company/StudentPreviewModal';

export default {
	name: 'company-application-selection-rounds',
	components: {
		'application-list-modal': ApplicationFullList,
		'student-preview': StudentPreviewModal
	},
	computed: {
		selectAll: {
			get:function() {
				return this.remainingStudents ? this.selectedStudents.length == this.remainingStudents.length : false;
			},
			set:function(value) {
				var selectedStudents = [];
				if(value){
					this.remainingStudents.forEach((rstudent)=>{
						selectedStudents.push(rstudent.enroll_no);
					})
				}
				this.selectedStudents = selectedStudents;
			}
		}
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		// this.season_id = this.$route.params.season_id;
		this.getRemainingStudents();

},
	data() {
		return {
			placement_id: null,
			remainingStudents: [],
			showData: false,
			selectedStudents: [],
			allStudents: false,
			showModal: false,
			modalValue: '',
			showViewModal: false
		};
	},
	methods: {
		getRemainingStudents() {
			company.getRemainingStudentsInApplication(this.getUserId(), this.placement_id)
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
			if(this.selectedStudents.length == 0) {
				alert("No student Selected");
			}
			else {
				company.postCompanyMoveToFirstRound(this.getUserId(), this.placement_id, this.selectedStudents)
				.then((response) => {
					if(response.status == 200) {
						this.getRemainingStudents();
					}
				})
				.catch((error) => {
					console.log(error);
				})
			}

		},
		getUserId() {
			return Auth.getUserToken();
		}
	},
}
</script>

<style lang="scss">
.company-application-selection-rounds {

	padding-top: 1.5rem;

	.box {
		margin-bottom: 2rem;
		border-radius: 4px;
	  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
	}

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
		padding-bottom: 2rem;
		display: flex;
		align-items: center;
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

	.company-application-selection-body {
		padding: 0.5rem;
		margin-left: 1rem;
		padding-left: 1.5rem;
		padding-right: 2.2rem;
		// border-bottom: solid 1px #ddd;
		display: flex;
		justify-content: space-between;
		margin: auto;
	}

	.view-profile {
		float: right;
	}

	.selection-checkbox {
		padding: 0.5rem;
		padding-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 0.5rem;
		border-top: solid 1px #ddd;
	}

	.selection-footer {
		border-top: solid 1px #ddd;
		padding: 1rem;
		padding-bottom: 0;
		margin-top: 1rem;
	}

	.no-data {
		padding: 1rem;
	}

}
</style>
