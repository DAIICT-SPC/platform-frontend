<template>
	<div class="draft-criteria-education-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Modal title</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Education</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control">
									<input type="hidden" v-model="ed_id=education[0].id">
									<edit-dropdown :ed_id="ed_id" :category_id="category_id"></edit-dropdown>
								</p>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>CPI</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input v-model="cpi_required" v-validate="'required|numeric'" type="number" name="cpi_required" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('cpi_required')">
									CPI is a required field.
								</div>
							</div>
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="addCriteria">Submit</a>
					<a class="button" v-on:click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import company from '@/api/company';
import EditEducationDropdown from '@/components/Company/EditEducationDropdown'
export default {
	name: 'draft-criteria-education-modal',
	props: {
		category_id: {
			required: true
		}
	},
	components: {
		'edit-dropdown': EditEducationDropdown
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.getEducation();
		this.$bus.$on('education-ended', () => {
			// $emit('close');
		});
		console.log(this.category_id);
		this.$bus.$on('education-change', (data) => {
			this.education_id = data.id;
		});
	},
	data() {
		return {
			placement_id: null,
			education_id: null,
			education: [],
			ed_id: null,
			cpi_required: null
		};
	},
	methods: {
		getEducation() {
			company.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, this.category_id)
			.then((response) => {
				this.education = response.data;
				this.ed_id = this.education[0].id;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		addCriteria() {
			console.log();
			company.setPlacementCriteria(this.getUserId(), this.placement_id, this.education_id,
			this.category_id, this.cpi_required)
			.then((response) => {
				if(response.status == 200) {
					$emit('close');
				}
			})
			.catch((error) => {
				console.log(error);
			})

		},
		getUserId() {
			return Auth.getUserToken();
		},
	}
}
</script>

<style lang="scss">
.draft-criteria-education-modal {

	.modal-card {
		margin: auto;
		margin-bottom: 20rem;
	}

}
</style>
