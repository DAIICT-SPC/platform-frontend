<template>
	<div class="offer-full-list">

		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Round wise in offer</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>

				<section class="modal-card-body">

					<div class="application-list">

						<div class="company-selection-body" v-for="st in students">
							<div class="">
								<span class="enroll"> {{ st.enroll_no }} </span>
								<span class="name"> {{ st.user.name }} </span>
							</div>
							<div class="catname">
								<span>{{ st.category.name }}</span>
							</div>
						</div>
					</div>

					<h3 v-if="!showData" class="title">No Data to show</h3>
				</section>

				<footer class="modal-card-foot">
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'offer-full-list',
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.getAllStudents();
	},
	data() {
		return {
			students: [],
			placement_id: null,
			season_id: null,
			showData: false
		};
	},
	methods: {
		getAllStudents() {
			company.getOfferRoundList(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data.length == 0) {
					this.showData = false;
				}
				else {
					this.showData = true;
					this.students = response.data;
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
.offer-full-list {

	.application-list {

		.company-selection-body {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 350px;
			margin-left: 0;
			padding: 0.1rem;
			.enroll .name {
				padding-right: 0.2rem;
			}
			.catname {

			}
		}

	}

	span{
		font-size: 18px;
	}
}
</style>
