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
					<button class="button is-primary" @click="validateAndSendCategory">Save And Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import category from '@/api/category';
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'select-round-details',
	data() {
		return {
			cat_id: null,
			categories_selected: [],
			categories: [],
			placement_id: null
		}
	},
	created() {
		if(this.$route.path == '/') {
			this.$router.push({name:'placement-primary'})
		}
		else {
			this.placement_id = this.$route.params.placement_id;
			this.callCategories();
		}
	},
	methods: {
		validateAndSendCategory() {
			this.validate()
			.then(() => {
				console.log(this.categories_selected);
				company.selectCategory(this.getUserId(), this.placement_id, this.categories_selected)
				.then((response) => {
					console.log(response);
					if(response.data == 'Already DB has entry!') {
						this.$router.push({ name: 'select-round-details', params:
						{
							placement_id: this.placement_id
						}
					});
				}
				else if(response.data == 'No Primary Details for this Placement!') {
					this.$router.push({ name: 'company-home' });
				}
				else {
					this.$router.push({ name: 'select-round-details', params:
					{
						placement_id: this.placement_id
					} });
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
	callCategories() {
		if (this.categories.length < 1) {
			category.all().then((response) => {
				this.categories = response.data;
			});
		}
	},
	getUserId() {
		return Auth.getUserToken();
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
