<template>
	<div class="feedback-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Change Password</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<div class="field is-horizontal">
						<div class="field-label">
							<p>Feedback Description</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<textarea v-model="feedbackDescription" v-validate="'required'" type="text" name="Feedback" class="textarea" placeholder="Feedback Description">
									</textarea>
								</p>
								<div class="help is-danger" v-show="errors.has('Feedback')">
									{{errors.first('Feedback')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal">
						<div class="field-label">
							<p>Ratings</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input @keyup.enter="validateAndGiveFeedback" v-model="Rating" v-validate="'required|max_value:10'" type="number" name="Rating" class="input" placeholder="*****">
								</p>
								<div class="help is-danger" v-show="errors.has('Rating')">
									{{errors.first('Rating')}}
								</div>
							</div>
						</div>
					</div>


				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndGiveFeedback">Save changes</a>
					<a class="button" v-on:click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import user from '@/api/user';
import Auth from '@/packages/auth/Auth';

export default{
	name: 'feedback-modal',
	created() {
		this.placement_id = this.$route.params.placement_id;
	},
	data() {
		return {
			placement_id: null,
			rating: null,
			feedbackDescription: ''
		}
	},
	methods: {
		validateAndGiveFeedback() {
			this.$validator.validateAll()
			.then(() => {
				// call api
				user.giveFeedback(this.getUserId(), this.placement_id, this.feedbackDescription, this.rating)
				.then((response) => {
					if(response.status == 200) {
						// notification feedback given successfully
						let toast = this.$toasted.success("Feedback Sent Successfully.", {
	            theme: "outline",
	            position: "top-center",
	            duration : 3000
	          });
						this.$bus.$emit('feedback-done');
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
    },
	}
}
</script>

<style lang="scss">
.feedback-modal {

}
</style>
