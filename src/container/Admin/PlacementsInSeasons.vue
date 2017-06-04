<template>
	<div class="placement-season-tiles">
		<div class="columns is-multiline">

			<!-- 1/3 col -->
			<div class="column is-one-third">
				<div class="card placement-tiles">
					<header class="card-header">
						<p class="card-header-title">
							Placement Season 1
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span class="tag is-success status">Open</span>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							Compony:&nbsp;<b>DLF</b><br>
							Location:&nbsp;<b>Banglore, India</b>
						</div>
					</div>
					<footer class="card-footer">
						<router-link :to="{ name: 'placements-drive-description' }" class="card-footer-item">View</router-link>
					</footer>
				</div>
			</div>
			<!-- 1/3 col -->

			<!-- 1/3 col -->
			<div class="column is-one-third">
				<div class="card placement-tiles">
					<header class="card-header">
						<p class="card-header-title">
							Placement Season 2
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span class="tag is-success status">Open</span>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							Compony:&nbsp;<b>DLF</b><br>
							Location:&nbsp;<b>Banglore, India</b>
						</div>
					</div>
					<footer class="card-footer">
						<router-link :to="{ name: '' }" class="card-footer-item">View</router-link>
					</footer>
				</div>
			</div>
			<!-- 1/3 col -->

			<!-- 1/3 col -->
			<div class="column is-one-third">
				<div class="card placement-tiles">
					<header class="card-header">
						<p class="card-header-title">
							Placement Season 1
						</p>
						<a class="card-header-icon">
							<span class="icon">
								<span class="tag is-success status">Open</span>
							</span>
						</a>
					</header>
					<div class="card-content">
						<div class="content">
							Compony:&nbsp;<b>DLF</b><br>
							Location:&nbsp;<b>Banglore, India</b>
						</div>
					</div>
					<footer class="card-footer">
						<router-link :to="{ name: 'placements-in-seasons' }" class="card-footer-item">View</router-link>
					</footer>
				</div>
			</div>
			<!-- 1/3 col -->


			<!-- <router-view></router-view> -->
		</div>
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
