<template>
	<div class="company-wise-listing box">

		<div class="company-wise head">
			<h2 class="title">Companies Wise Listing</h2>
		</div>

		<div class="companywise-body">
			<div class="one-company" v-for="company in companies">
				<input type="hidden" v-model="user_id = company.company_detail.user_id">
				<span class="text title is-4">{{ company.company_detail.company_name }}</span>
				<a @click="loginas()" class="button is-success is-outlined a-tag login">Login As</a>
				<a @click="allowCompany(company.company_detail.id)" class="button is-success is-outlined a-tag" v-if="company.status != 'allowed'">Allow</a>
				<a @click="disallowCompany(company.company_detail.id)" class="button is-danger is-outlined a-tag" v-if="company.status == 'allowed'">Cancel</a>
			</div>

		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'

export default {
	name: 'company-wise-listing',
	data() {
		return{
			season_id: null,
			companies:[],
			user_id: null,
			toen: ''
		}
	},
	// beforeUpdate() {
	// 	this.callAllowedCompanies();
	// },
	created() {
		this.season_id = this.$route.params.season_id;
		// getAllowedCompanies
		this.callAllowedCompanies();
	},

	methods: {
		callAllowedCompanies() {
			admin.getAllowedCompanies(this.season_id)
			.then((response) => {
				this.companies = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		allowCompany(company_id) {
			admin.postAllowCompany(this.season_id, company_id)
			.then((response) => {
				if(response.status == 200){
					this.callAllowedCompanies();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		disallowCompany(company_id) {
			admin.postDisallowCompany(this.season_id, company_id)
			.then((response) => {
				if(response.status == 200){
					this.callAllowedCompanies();
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		loginas() {
			console.log(this.user_id);
				admin.postloginas(this.user_id)
				.then((response) => {
					if(response.status == 200) {
						this.token = response.data.token;
						Auth.
						swapToken(this.token, this.user_id);
						window.location.href='/company';
					}
				})
				.catch((error) => {
					console.log(error);
				})
		},
	}
}
</script>

<style lang="scss">
.company-wise-listing {

	max-width: 500px;

	.company-wise {
		padding: 1rem;
		border-bottom: solid 1px #ddd;
	}

	.companywise-body {
		padding: 1.5rem;
	}

	.one-company {
		width: 100%;
		padding: 0.5rem;
		border-bottom: solid 1px #ddd;
		.text {
			padding-left: 5px;
		}
	}

	.login {
		margin-left: 0.3rem;
	}

	.a-tag {
		float: right;
	}

}
</style>
