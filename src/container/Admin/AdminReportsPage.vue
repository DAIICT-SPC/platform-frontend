<template>
	<div class="container reports-page">
		<div class=" box placement-page">

			<div class="reports-header">
				<h2 class="title header">Manage</h2>
			</div>

			<!-- tabs starts -->
			<div class="tabs">
				<ul>
					<li class="li-tabs"><router-link :to="{ name: 'placed-students' }">Placed Students</router-link></li>
					<li class="li-tabs"><router-link :to="{ name: 'placed-categorywise' }">Placed Categorywise</router-link></li>
					<li class="li-tabs"><router-link :to="{ name: 'unplaced-students' }">Unplaced Students</router-link></li>
					<li class="li-tabs"><router-link :to="{ name: 'unplaced-categorywise' }">Unplaced Categorywise</router-link></li>
					<li class="li-tabs"><router-link :to="{ name: 'externally-allowed' }">Externally Allowed</router-link></li>
					<li class="li-tabs"><router-link :to="{ name: 'student-info' }">Student Info</router-link></li>
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
.reports-page {

	.box {
		padding: 0;
		border-radius: 4px;
	  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
	}

 .reports-header {
 	padding: 1rem;
 	border-bottom: solid 1px #ddd;
 }

 .tabs {
 	margin: 0;
 }

 .li-tabs {
 	border-right: solid 1px #ddd;
 }


}
</style>
