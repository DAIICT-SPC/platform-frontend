<template>
	<div class="selection-round-offer">
		<div class="box">
			<div v-if="showData">
				<div class="selection-header">
					<h3 class="title">Offers <span class="subtitle">(Remaining)</span></h3>
					<button @click="showModal = true" class="button is-success">Reports</button>
				</div>

				<div v-for="studentData in remainingStudents">
					<div class="selection-body" v-if="studentData.user">
						<div>
							<span class="enroll title is-4">{{studentData.enroll_no}}</span>
							<span class="name title is-4">{{studentData.user.name}}</span>
							<span class="category title is-4">{{studentData.category.name}}</span>
						</div>

						<offer-modal :key="studentData.enroll_no" :placement_id="placement_id" :studentData="studentData">

						</offer-modal>

					</div>
				</div>

				<div class="selection-footer">
					<router-link :to="{ name: 'placements-drive-description', params: { placement_id: placement_id } }" class="button is-primary back-button">Back</router-link>
					<a class="button close-btn">Close</a>
				</div>
			</div>
			<div v-if="!showData && !allStudents">
				<h3 class="title no-data">No Student has reached till last Round!</h3>
			</div>
			<div class="allow" v-if="allStudents">
				<h3 class="title no-data">All Students got Offer!</h3>
				<button class="button is-success">Reports</button>
			</div>
		</div>
		<offer-full-list @close="showModal = false" v-if="showModal"></offer-full-list>
	</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';
import OfferModal from '@/components/OfferModal';
import OfferFullList from '@/components/OfferFullList';

export default {
	name: 'selection-round-offer',
	components: {
		OfferModal,
		OfferFullList
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.getStudentsOffer();
		this.$bus.$on('refresh', () => {
			this.getStudentsOffer();
		})
	},
	data() {
		return {
			placement_id: null,
			remainingStudents: [],
			showData: true,
			allStudents: false,
			showModal: false
		};
	},
	methods: {
		getStudentsOffer() {
			admin.getStudentsForOffer(this.getuserId(), this.placement_id)
			.then((response) => {
				this.remainingStudents = response.data;
				console.log(response);
				if(response.data == 'All Students in offer layer got Offer!'){
					this.allStudents = true;
					this.showData = false;
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getuserId() {
			return Auth.getUserToken();
		}
	},
}
</script>

<style lang="scss">
.selection-round-offer {

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
		padding-right: 1.5rem;
		display: flex;
		justify-content: space-between;
		margin: auto;
		border-bottom: solid 1px #ddd;
		margin-bottom: 1rem;
	}

	.selection-body {
		display: flex;
		justify-content: space-between;
		margin: auto;
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
		padding-right: 1.0rem;
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
