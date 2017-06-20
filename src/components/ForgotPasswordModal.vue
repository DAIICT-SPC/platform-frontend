<template>
	<div class="forgot-password-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Forgot Password</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p class="email-text">Email</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input v-validate="'required'" v-model="email" type="email" name="email" class="input">
								</p>
							</div>
						</div>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndEmail">Submit</a>
					<a class="button" v-on:click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';

export default{
	name: 'forgot-password-modal',
	data() {
		return {
			email: ''
		};
	},
	methods: {
		validateAndEmail() {
			this.validate().then(() => {
				// .catch((error) => {
				// 	console.log(error.message);
				// })
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
.forgot-password-modal {

	.modal-card-body {
		padding-left: 0;
		padding-right: 15rem;
	}

	.email-text {
		color: black;
	}
}

</style>
