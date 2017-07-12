<template>
	<div class="new-placement-page">
		<div class="container placement-page">



			<!-- tabs starts -->
			<div class="tabs">
				<ul>
					<li><router-link :to="{ name: 'placement-season-manage' }">Placement Seasons</router-link></li>
					<li><router-link :to="{ name: 'show-add-categories' }">Categories</router-link></li>
					<li><router-link :to="{ name: 'show-add-jobtypes' }">Job Types</router-link></li>
					<li><router-link :to="{ name: 'show-add-education' }">Education</router-link></li>
					<li><router-link :to="{ name: 'add-users' }">Add Users</router-link></li>
					<li><router-link :to="{ name: 'login-records' }">Login Records</router-link></li>
				</ul>
			</div>
			<!-- tabs ends -->

			<router-view></router-view>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';
export default {
	name: 'placement',
	data() {
		return {
		}
	},
}
</script>

<style lang="scss">
.new-placement-page {

	.container.placement-page {
		padding-top: 0;
	}

}
</style>
