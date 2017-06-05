<template>
	<div class="edit-company-description">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Edit Description</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<div class="form">
						<div class="field">
							<label class="label">Description</label>
							<p class="control">
								<textarea v-validate="'required|alpha'" name="description" class="textarea is-hovered" placeholder="Edit Company Details"></textarea>
							</p>
							<div v-show="errors.has('description')" class="help is-danger">
								The Description cant be empty.
							</div>
						</div>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success update-btn">Update</a>
					<a class="button close-btn" @click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'edit-description'
	}
</script>

<style lang="scss">
	.edit-company-description{
		.form{
			padding: 0.5rem;
		}

		.update-btn{
			margin-left: 0.5rem;
		}

		.close-btn{
			margin-left: 26.5rem;
		}
	}
</style>