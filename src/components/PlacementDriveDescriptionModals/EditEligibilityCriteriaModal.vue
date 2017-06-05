<template>
	<div class="edit-company-description">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Edit Eligibility Criteria</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">

					<div class="form">
						<div class="field">
							<label class="label">Current CPI</label>
							<p class="control">
								<input v-validate="'required|decimal'" name="currentCpi" class="input" type="number" placeholder="Current CPI">
							</p>
							<div v-show="errors.has('currentCpi')" class="help is-danger">
								The Current CPI is required.
							</div>
						</div>

						<div class="field">
							<label class="label">Higher Secondary</label>
							<p class="control">
								<input v-validate="'required|decimal'" class="input" type="number"  name="higherSecondary" placeholder="Higher Secondary">
							</p>
							<div v-show="errors.has('higherSecondary')" class="help is-danger">
								The Higher Secondary Marks is required.
							</div>
						</div>

						<div class="field">
							<label class="label">Secondary</label>
							<p class="control">
								<input v-validate="'required|decimal'" class="input" name="secondary" type="number" placeholder="Secondary">
							</p>
							<div v-show="errors.has('secondary')" class="help is-danger">
								The Secondary Marks is required.
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