<template lang="html">
	<div class="open-for-modal">
		<div class="open-for-modal">
			<div class="modal is-active">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Programs Open For</p>
						<button class="delete" @click="$emit('close')"></button>
					</header>
					<section class="modal-card-body" v-if="showData">
						<div class="field">
							<p class="control">
								<label class="label" v-if="chk.name" v-for="chk in openForChecked">
									<input v-model="categories_selected"  v-validate data-vv-rules="required" type="checkbox"
									name="categories" :value="chk.id"  > &nbsp; {{ chk.name }}
								</label>
							</p>
							<div class="help is-danger" v-show="errors.has('categories')">
								Please select atleast one Category to continue.
							</div>
						</div>

					</section>
					<section class="modal-card-body" v-if="!showData">
						<div>
							No categories left to select,
						</div>
					</section>
					<footer class="modal-card-foot">
						<a class="button is-success" @click="updateOpenForDetail">Submit</a>
						<a class="button" @click="$emit('close')">Close</a>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';
import category from '@/api/category';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'open-for-modal',
	props: ['placementDescription'],
	created() {
	},
	data() {
		return {
			cat_id: null,
			categories_selected: [],
			categories: [],
			placement_id: null,
			openForChecked: [],
			openForUnchecked: [],
			showData: null
		}
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.callOpenForCategories();
	},
	methods: {
		validate() {
			return this.$validator.validateAll();
		},
		callOpenForCategories() {
			admin.getOpenFor(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data == 'No Category Left!') {
					this.showData = false;
				}
				else {
					this.showData = true;
					this.openForChecked = response.data;
					this.openForUnchecked = response.data.unchecked;
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		updateOpenForDetail() {
			this.validate().then(() => {
				admin.patchOpenForDetail(this.getUserId(), this.placement_id, this.categories_selected)
				.then((response) => {
					if(response.status == 200) {
						let toast = this.$toasted.success("Category Added", {
							theme: "outline",
							position: "top-center",
							duration : 3000
						});
						this.$bus.$emit('close')

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
		}
	}
}

</script>

<style lang="scss">
.open-for-modal {

}
</style>
