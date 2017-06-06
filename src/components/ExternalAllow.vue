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
								<input class="input" type="number" placeholder="Please Enter the External Enrollment Number to allow">
							</p>
						</div>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success save-btn">Submit</a>
					<a class="button close-btn" @click="$emit('close')">Close</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'external-allowed'

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
