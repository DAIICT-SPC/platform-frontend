<template>
	<div class="card company-sidebar">
		<aside class="menu">
			<ul class="menu-list">
				<li><router-link :to="{ name: 'placements-in-seasons' }">General</router-link></li>
				<li><router-link :to="{ name: 'companywise-placement' }">Companywise Placement</router-link></li>
				<li><router-link :to="{ name: 'company-list' }">Companies</router-link></li>
			</ul>
		</aside>
	</div>
</template>

<script>

export default {
	name: 'placement-tiles-page',

}
</script>

<style lang="scss">
.placement-season-tiles {
	.placement-tiles{
		margin-top: 0rem;
		border-radius: 4px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);

	}

	.status{
		margin-right: 2rem;
	}
}
</style>
