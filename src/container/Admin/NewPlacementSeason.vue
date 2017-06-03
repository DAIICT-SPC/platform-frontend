<template>
	<div class="new-placement-page">
		<div class="container">

			<h2 class="title header">Start New Placement Season</h2>

			<div class="field has-addons">
				<p class="control is-fullwidth">
					<input class="input input-box" type="text" placeholder="Create New Placement Season">
				</p>
				<p class="control">
					<a class="button is-success"> Submit </a>
				</p>
			</div>

			<!-- tabs starts -->
			<div class="tabs">
				<ul>
					<li><router-link :to="{ path: '/admin/dashboard' }">Home</router-link></li>
					<li><a v-on:click="redirectToCompantIn">Companies In Season</a></li>
					<li><a v-on:click="redirectToCompanyWise">Companies Wise Listing</a></li>
				</ul>
			</div>
			<!-- tabs ends -->

			<div class="columns is-multiline">

				<!-- 1/3 col -->
				<div class="column is-one-third">
					<div class="card placement-season">
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
					<div class="card placement-season">
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
					<div class="card placement-season">
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
					<div class="card placement-season">
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
							<a class="card-footer-item" v-on:click="redirect">View</a>

							<!-- <router-link :to="{ name: 'placement-detail' }" class="card-footer-item">View</router-link> -->
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
	name: 'placement',
	methods: {
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
