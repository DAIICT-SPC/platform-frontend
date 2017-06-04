<template>
	<div class="new-placement-page">
		<div class="container placement-page">

			<h2 class="title header">Start New Placement Season</h2>
			<div>
				<div class="field has-addons">
					<p class="control is-fullwidth">
						<input v-model="title" v-validate="'required'" name="season" class="input input-box" type="text" placeholder="Create New Placement Season">
					</p>
					<p class="control">
						<a class="button is-success" @click="createSeason"> Submit </a>
					</p>
				</div>
				<div class="help is-danger" v-show="errors.has('season')">
					{{errors.first('season')}}
				</div>
			</div>

			<!-- tabs starts -->
			<div class="tabs">
				<ul>
					<li><router-link :to="{ name: 'admin-home' }">Show All</router-link></li>
					<li><router-link :to="{ name: 'show-add-categories' }">Categories</router-link></li>
					<li><router-link :to="{ name: 'show-add-jobtypes' }">Job Types</router-link></li>
					<li><router-link :to="{ name: 'show-add-education' }">Education</router-link></li>
					<li><a>Users</a></li>
					<li><a>Reports</a></li>
				</ul>
			</div>
			<!-- tabs ends -->

			<router-view></router-view>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'
export default {
	name: 'placement',
	data() {
		return {
				title: ''
		}
	},
	methods: {
		createSeason() {
			this.validate().then(() => {
				this.createPlacementSeason();
			})
			.catch((error) => {
				console.log(error);
			})
		},
		createPlacementSeason() {
			admin.createSeason(this.title)
			.then((response) => {
				if(response.status	== 200){
					alert('Placement Season Successfully Created')
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		validate() {
			return this.$validator.validateAll();
		},
		redirect: function(){
			this.$router.push({ name: 'placement-detail' });
		},

		redirectToCompantIn: function(){
			this.$router.push({ name: 'companies-in-season' });
		},

		redirectToCompanyWise: function(){
			this.$router.push({ name: 'company-wise-listing' });
		}
	}
}
</script>

<style lang="scss">
.new-placement-page {


	.title.header {
		border-bottom: solid 1px #ddd;
		padding-bottom: 1rem;
	}

	.placement-season {
		margin-top: 1rem;
	}

	.status{
		margin-right: 1.5rem;
	}

	.input-box{
		width: 890px;
	}
}
</style>
