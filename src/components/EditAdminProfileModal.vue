<template>
	<div class="admin-edit-modal">

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
							<p>Admin Name</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input v-validate="'required'" v-model="name = adminDetails.name" type="text" name="adminName" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('adminName')">
									{{errors.first('adminName')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Email</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input disabled v-validate="'required'" v-model="email = adminDetails.email" type="email" name="email" class="input">
								</p>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Position</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input v-validate="'required'" v-model="position = adminDetails.position" type="text" name="position" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('position')">
									{{errors.first('position')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Contact No</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input v-validate="'required|numeric'" v-model="contact_no = adminDetails.contact_no" type="number" name="contactNo" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('contactNo')">
									{{errors.first('contactNo')}}
								</div>
							</div>
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndUpdateAdminDetails">Save changes</a>
					<a class="button" v-on:click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'

export default{
	name: 'admin-edit-modal',
	props: {
		adminDetails: {
			required: true,
			type: Object
		}
	},
	data() {
		return {
			name: '',
			email: '',
			position: '',
			contact_no: null
		}
	},
	methods: {
		validateAndUpdateAdminDetails() {
			this.validate().then(() => {
				// /console.log(this.getUserId()+"-"+ this.name+"-"+ this.contact_no+"-"+ this.position);
				admin.postUserDetails(this.getUserId(), this.name, this.contact_no, this.position)
				.then((response) => {
					if(response.status == 200){
						alert('Profile Updated');
						this.$emit('close');
					}
				})
				.catch((error) => {
					console.log(error.message);
				})
			})
			.catch((error) => {
				console.log(error)
			})
		},
		validate() {
			return this.$validator.validateAll();
		},
    getUserId() {
      return Auth.getUserToken();
    }
	}
}
</script>

<style lang="scss">

</style>
