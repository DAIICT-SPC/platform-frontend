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

					<div class="field is-horizontal">
						<div class="field-label">
							<p class="email-text">Email</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input @keyup.enter="validateAndEmail" v-validate="'required|email'" v-model="email" type="email" name="email" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('email')">
									Please Enter the Valied Email.
								</div>
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
import user from '@/api/user';

export default{
	name: 'forgot-password-modal',
	data() {
		return {
			email: ''
		};
	},
	methods: {
		validateAndEmail() {
			this.validate()
			.then(() => {
				user.postEmailForPasswordForget(this.email)
				.then((response) => {
					if(response.data == 'No such Email exist!') {
						let toast = this.$toasted.error("No such Email exist!", {
			        theme: "outline",
			        position: "bottom-center",
			        duration : 3000
			      });
					}
					else {
						// safe
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
.forgot-password-modal {

	.modal-card-body {
		padding-left: 0;
		padding-right: 15rem;
	}

	.email-text {
		color: black;
	}

	.field.is-horizontal {
		display: flex;
		align-items: center;
	}
}

</style>
