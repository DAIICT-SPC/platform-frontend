<template>
	<div class="edit-round-details">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Edit Rounds</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
				Round Details

				<div class="form">
					
				</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success update-btn">Update</a>
					<a class="button close-btn" @click="$emit('close')">Close</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'edit-round-details'
	}
</script>

<style lang="scss">
	.edit-round-details{
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