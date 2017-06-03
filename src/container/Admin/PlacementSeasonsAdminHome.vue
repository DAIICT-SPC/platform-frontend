<template>
	<div class="placement-seasons-admin-home">
		<div class="container">


			<div class="columns is-multiline">

				<!-- 1/3 col -->
				<div class="column is-one-third">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								Placement Season
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
							<router-link :to="{ name: 'view-job-profile', params: { id: 1 } }" class="card-footer-item">View</router-link>
							<router-link :to="{ name: 'placement-detail' }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->

				<!-- 1/3 col -->
				<div class="column is-one-third">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								Placement Season
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
							<router-link :to="{ name: 'view-job-profile', params: { id: 1 } }" class="card-footer-item">View</router-link>
							<router-link :to="{ name: 'placement-detail' }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->

				<!-- 1/3 col -->
				<div class="column is-one-third">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								Placement Season
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
							<router-link :to="{ name: 'view-job-profile', params: { id: 1 } }" class="card-footer-item">View</router-link>
							<router-link :to="{ name: 'placement-detail' }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->

				<!-- 1/3 col -->
				<div class="column is-one-third">
					<div class="card placement-tiles">
						<header class="card-header">
							<p class="card-header-title">
								Placement Season
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
							<router-link :to="{ name: 'view-job-profile', params: { id: 1 } }" class="card-footer-item">View</router-link>
							<router-link :to="{ name: 'placement-detail' }" class="card-footer-item">View</router-link>
						</footer>
					</div>
				</div>
				<!-- 1/3 col -->

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'placement-seasons-admin-home'
}
</script>

<style lang="scss">
.placement-seasons-admin-home {

	.column .card{
		border-radius: 4px;
		box-shadow: 0px 4px 5px #d0cfcf;
	}
	.tag.is-success, .is-info{
		padding-bottom: 3px;
	}

	.icon {
		padding-right: 25px;
	}
}
</style>
