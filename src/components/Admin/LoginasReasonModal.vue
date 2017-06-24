<template>
	<div class="reason-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Reason for Login</p>
				</header>
				<section class="modal-card-body">

					<div class="">
							<div>
								<p class="control ">
									<textarea v-model="reason" v-validate="'required'" type="text" name="reason" class="textarea" placeholder="Reason for Login">
									</textarea>
								</p>
								<div class="help is-danger" v-show="errors.has('reason')">
									The Reason cannot be Empty.
								</div>
							</div>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndSubmitReason">Save changes</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'reason-modal',
	props: {
		to_user_id: {
			required: true
		}
	},
	created() {
	},
	data() {
		return {
			reason: '',
		}
	},
	methods: {
		validateAndSubmitReason() {
			this.validate()
			.then(() => {
				// call api
				admin.loginasReason(this.getUserId(), this.to_user_id, this.reason)
				.then((response) => {
					if(response.status == 200) {
						this.$bus.$emit('reason-modal', {token: response.data.token});
					}
				})
				.catch((error) => {
					console.log(error);
				})
			})
			.catch((error) => {
				console.log(error);
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
.reason-modal {

}
</style>
