<template>
	<div class="admin-profile-page">
		<div class="container">

			<div class="admin-profile box">

				<div class="admin-profile header">
					<h2 class="title">Overview</h2>
				</div>
				<!-- form data starts -->
				<div class="admin-profile body">
					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Admin Name</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									{{ adminDetails.name }}
								</p>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Email</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">

								</p>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Position</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									{{ adminDetails.position }}
								</p>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Contact No</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									{{ adminDetails.contact_no }}
								</p>
							</div>
						</div>
					</div>

					<modal :adminDetails="adminDetails" v-if="showModal" @close="showModal = false"></modal>

					<div class="field is-grouped">
						<p class="control admin-profile">
							<!-- <button class="button is-default" v-on:click="redirect">Edit</button> -->
							<button class="button is-success" v-on:click="showModal=true">Edit Details</button>
						</p>
					</div>
				</div>
				<!-- form data ends -->
			</div>
		</div>
	</div>
</template>

<script>
import EditAdminProfileModal from '@/components/EditAdminProfileModal'
import Auth from '@/packages/auth/Auth'
import admin from '@/api/admin'

export default{
	name: 'admin-profile-page',
	components: {
		'modal': EditAdminProfileModal
	},
	created() {
		admin.getUserDetails(this.getUserId())
		.then((response) => {
			this.adminDetails = response.data;
		})
		.catch((error) => {
			console.log(error);
		})
	},
	data() {
		return {
			showModal: false,
			adminDetails: { }
		}
	},
	methods: {
		getUserId() {
      return Auth.getUserToken();
    }
	}
}
</script>

<style lang="scss">
.admin-profile-page {
	margin-bottom: 1.5rem;

	.admin-profile.box {
		padding: 0;
	}

	.admin-profile.header {
		padding: 1rem;
		border-bottom: solid 1px #ddd;
	}

	.admin-profile.body {
		padding-left: 1.5rem;
		padding-top: 1.5rem;
	}

	.abt-admin
	{
		border-bottom: solid 1px #ddd;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		.field-label {
			text-align: left;
			font-weight: bold;
		}
	}

	.admin-profile button {
		margin-bottom: 1rem;
	}
}
</style>
