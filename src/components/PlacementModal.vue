<template>
	<div class="admin-edit-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">{{ round }}</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					{{ round }}
				</section>
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
		round: ''
	},
	created() {
		console.log(this.round);
	}
}
</script>

<style lang="scss">

</style>
