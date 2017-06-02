<template>
	<div class="company-modal">

		<!-- company modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Edit Company Details</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<!-- form data starts -->
					<div class="form">

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Company Name</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
										<input v-validate="'required'" v-model="company_name = companyDetails.company_name" type="text" name="companyName" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('companyName')">
										{{errors.first('companyName')}}
									</div>
								</div>
							</div>
						</div>

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Address</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
										<input v-validate="'required'" v-model="address = companyDetails.address" type="text" name="address" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('address')">
										{{errors.first('address')}}
									</div>
								</div>
							</div>
						</div>

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Contact Person</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
										<input v-validate="'required'" v-model="contact_person = companyDetails.name" type="text" name="contactPerson" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('contactPerson')">
										{{errors.first('contactPerson')}}
									</div>
								</div>
							</div>
						</div>

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Contact No</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
										<input v-validate="'required'" v-model="contact_no = companyDetails.contact_no" type="number" name="contactNo" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('contactNo')">
										{{errors.first('contactNo')}}
									</div>
								</div>
							</div>
						</div>

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Company Description</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
										<input v-validate="'required'" v-model="company_expertise = companyDetails.company_expertise" type="text" name="companyDescription" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('companyDescription')">
										{{errors.first('companyDescription')}}
									</div>
								</div>
							</div>
						</div>

						<div class="field is-horizontal">
							<div class="field-label">
								<p>Company URL</p>
							</div>
							<div class="field-body">
								<div>
									<p class="control ">
									<input v-validate="'required'" v-model="company_url = companyDetails.company_url" type="text" name="companyUrl" class="input">
									</p>
									<div class="help is-danger" v-show="errors.has('companyUrl')">
										{{errors.first('companyUrl')}}
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- form data ends -->




				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndUpdateCompanyDetails">Save changes</a>
					<a class="button" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>

		<!-- company modal ends -->

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import company from '@/api/company'

	export default{
		name: 'company-modal',
		props: {
			companyDetails: {
				required: true,
				type: Object
			}
		},
		data() {
			return {
				company_name: '',
				address: '',
				contact_person: '',
				contact_no: null,
				company_expertise: '',
				company_url: ''
			}
		},
		methods: {
			validateAndUpdateCompanyDetails() {
				this.$validator.validateAll().then(() => {
					// console.log(this.company_name+"-"+ this.address+"-"+ this.contact_person+"-"+
					// this.contact_no+"-"+ this.company_expertise+"-"+ this.company_url);
					company.postUserDetails(this.getUserId(), this.company_name, this.address, this.contact_person,
					this.contact_no, this.company_expertise, this.company_url)
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					})
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

</style>
