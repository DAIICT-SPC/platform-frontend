<template lang="html">
	<div class="open-for-modal">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Open For</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>
				<section class="modal-card-body">
					<div class="category-body">

						<div class="field">
							<p class="control">
								<label class="label" v-for="cat in categories">
									<input v-validate data-vv-rules="required" type="checkbox" name="categories" :value="cat.id" v-model="categories_selected"> &nbsp; {{ cat.name }}
								</label>
							</p>
							<div v-show="errors.has('categories')" class="help is-danger">
								{{errors.first('categories')}}
							</div>
						</div>

					</div>
				</section>
				<footer class="modal-card-foot">
					<a class="button is-success">Submit</a>
					<a class="button" @click="$emit('close')">Close</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style lang="css">

	.category-header {
		border-bottom: solid 1px #ddd;
		margin-bottom: 0;
		padding: 1rem;
	}

	.category-body {
		padding: 0.5rem;
	}

	.control {
		font-size: 1rem;
		position: relative;
		text-align: left;
		padding: 1rem;
	}

	.modal-card-foot{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

</style>
