<template>
	<div class="external-allowed">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">External Allow</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<div class="title-div">
							<label class="title is-4">Enrollment Number</label>
						</div>
						<p class="control">
							<input name="enroll_no" v-validate="'required'" v-model="enroll_no" class="input" type="number" placeholder="Please Enter the External Enrollment Number to allow">
						</p>
						<div class="help is-danger" v-show="errors.has('enroll_no')">
							The Enrollnment Number is required
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<a @click="allowStudent" class="button is-success save-btn">Submit</a>
					<a class="button close-btn" @click="$emit('close')">Close</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default{
	name: 'external-allowed',
	created() {
		this.placement_id = this.$route.params.placement_id;
	},
	data() {
		return {
			placement_id: null,
			user_id: null,
			enroll_no: null
		};
	},
	methods: {
		allowStudent() {
			console.log(this.getUserId() + this.placement_id + this.enroll_no);
			admin.allowExternalStudents(this.getUserId(), this.placement_id, this.enroll_no)
			.then((response) => {
				if(response.status == 200) {
					this.$bus.$emit('close_external');
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			return Auth.getUserToken();
		}
	},
}
</script>

<style lang="scss">
.external-allowed {

	.modal-card-head {
		padding: 1rem;;
	}

	.modal-card-foot{
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.title-div {
		padding-bottom: 0.6rem;
	}

	.modal-card-body {
		padding: 1rem;
	}

	.section-body {
		// padding: 1.5rem;
	}

}
</style>
