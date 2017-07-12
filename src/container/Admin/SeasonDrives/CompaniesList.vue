<template>
	<div class="company-wise-listing box">

		<div class="company-wise head">
			<h2 class="title">Manage Companies</h2>
		</div>

		<div class="companywise-body">
			<div class="one-company" v-for="company in companies">
				<input type="hidden" v-model="to_user_id = company.company_detail.user_id">
				<span class="text title is-4">{{ company.company_detail.company_name }}</span>
				<a @click="modalOpen()" class="button is-success is-outlined a-tag login">Login As</a>
				<a @click="allowCompany(company.company_detail.id)" class="button is-success is-outlined a-tag allow-btn"
				v-if="company.status != 'allowed'">Allow</a>
				<a @click="disallowCompany(company.company_detail.id)" class="button is-danger is-outlined a-tag"
				v-if="company.status == 'allowed'">Cancel</a>
			</div>
			<reason-modal :to_user_id="to_user_id" v-if="reasonModal"></reason-modal>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
import ReasonModal from '@/components/Admin/LoginasReasonModal';

export default {
	name: 'company-wise-listing',
	components: {
		ReasonModal
	},
	data() {
		return{
			season_id: null,
			companies:[],
			to_user_id: null,
			token: '',
			reasonModal: false
		}
	},
	// beforeUpdate() {
	// 	this.callAllowedCompanies();
	// },
	created() {
		this.season_id = this.$route.params.season_id;
		// getAllowedCompanies
		this.callAllowedCompanies();
		this.$bus.$on('reason-modal', (response) => {
			this.loginas(response.token);
		});
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
		modalOpen() {
			// modal for reason
			this.reasonModal = true;
		},
		loginas(new_token) {
			// then login
			Auth.swapToken(new_token, this.to_user_id);
			window.location.href='/company';
			// previous logic
			// admin.postloginas(this.to_user_id)
			// .then((response) => {
			// 	if(response.status == 200) {
			// 		this.token = response.data.token;
			// 		Auth.swapToken(this.new_token, this.to_user_id);
			// 		window.location.href='/company';
			// 	}
			// })
			// .catch((error) => {
			// 	console.log(error);
			// })
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

	.allow-btn {
		padding-left: 1rem;
		padding-right: 1rem;
	}

}
</style>
