<template>
	<div class="select-round-details">


		<h2 class="title category-header">Open For</h2>
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

			<div class="field is-grouped">
				<p class="control">
					<button class="button is-primary" @click="validate">Save And Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import category from '@/api/category';

export default {
	name: 'select-round-details',
	data() {
		return {
			cat_id: null,
			categories_selected: [],
			categories: []
		}
	},
	created() {
		if (this.categories.length < 1) {
			category.all().then((response) => {
				this.categories = response.data;
			});
		}
	},
	methods: {
		validate() {
			this.$validator.validateAll()
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			})
		}
	}
}
</script>

<style lang="scss">
.select-round-details {

	.category-header {
		border-bottom: solid 1px #ddd;
		margin-bottom: 0;
		padding: 1rem;
	}
	.category-body {
		padding: 1rem;
	}

	.control {
		font-size: 1rem;
		position: relative;
		text-align: left;
		padding: 1rem;
	}
}
</style>
