<template>
	<div class="placement-detail-page">
		<div class="details box">
			<div class="job-header job-section" v-if="placementDescription.company">
				<div class="heading-main">
					<p class="title is-3 job-title">{{ placementDescription.job_title }}</p>
					<p class="subtitle is-6 company-details">{{ placementDescription.company.company_name }}, {{ placementDescription.location }}</p>
				</div>
				<div class="header-action is-pulled-right">
					<span class="tag">{{ placementDescription.status }}</span>
					<div class="apply-box">
            <a v-if="placementDescription.status == 'closed'" class="button is-success">Re Open</a>
          </div>
				</div>
			</div>

			<div class="job-description job-section">
				<b class="section-header">Job Description
					<div class="header-action is-pulled-right">
						<!-- placementDescription.status == 'closed' -->
						<div class="button is-white" @click="showDesc = !showDesc" v-if="!showDesc && placementDescription.status == 'application'"> {{show}} </div>
						<div class="button is-white" @click="showDesc = !showDesc" v-if="showDesc"> {{hide}} </div>
					</div>
				</b>

				<p>{{ placementDescription.job_description }}</p>
				<drive-box :placementDescription="placementDescription" v-if="showDesc"></drive-box>
			</div>

			<div class="eligibility-criteria job-section">
				<b class="section-header">Eligibility Criteria</b>

				<div class="columns is-multiline">

					<div class="column" v-for="categories in placementDescription.categories">
						<div class="card">
							<header class="card-header">
								<p class="card-header-title"> {{ categories.name }} </p>
								<div class="header-action is-pulled-right edit-btn">
								</div>
							</header>

							<footer class="stripe-footer">
								<div class="columns">
									<div class="column" v-for="cat in categories.criterias">{{ cat.education.name }} <br> {{cat.cpi_required}}</div>
								</div>
							</footer>
							<div>
								<criteria-box v-if=" placementDescription.status == 'application'" :key="categories.id" :criterias="categories.criterias"></criteria-box>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="hiring-process job-section">
				<b class="section-header">Hiring Process
					<div class="header-action is-pulled-right">

					</div>
				</b>

				<div class="processes">

					<div class="process-application process">
						<div class="box application">
							<p>Application</p>
							<div class="view-info">
								<router-link :to="{ name: 'selection-rounds', params: { placement_id: placement_id } }" class="is-success">View info</router-link>
							</div>
						</div>
					</div>

					<div class="box process" v-for="round,index in placementDescription.placement_selection">
						<p>{{ round.round_name }}</p>
						<router-link :to="{ name: 'selection-rounds-dynamic', params: { placement_id: placement_id, round_id: round.id } }" class="is-success">View info</router-link><br>
						<a class="is-primary">Set Venue & Date</a>
					</div>

					<div class="process-offer process">
						<div class="box offer">
							<p>Offer</p>
							<router-link :to="{ name: 'selected-for-offer', params: { placement_id:placement_id }  }" class="is-success">View info</router-link><br>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';
import PlacementDriveEditBox from '@/components/PlacementDriveEditBox'
import EligibilityCriteriaBox from '@/components/EligibilityCriteriaBox'

export default {
	name: 'placement-detail-page',

	components: {
		'drive-box': PlacementDriveEditBox,
		'criteria-box': EligibilityCriteriaBox
	},

	created() {
		this.season_id = this.$route.params.season_id;
		this.placement_id = this.$route.params.placement_id;
		this.getPlacementDetails();
		this.$bus.$on('closeDescription', () => {
			this.showDesc = false;
		});
	},


	data(){
		return {
			season_id: null,
			placement_id: null,
			placementDescription: { },
			showDesc: false,
			showCriteria: false,
			criteriaId: null,
			hide: "Hide",
			show: "Edit",
			re_open_modal: false
		}
	},

	methods: {
		getPlacementDetails() {
			admin.getAdminPlacementDetails(this.getUserId(), this.placement_id)
			.then((response) => {
				this.placementDescription = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			return Auth.getUserToken();
		},
		alertFunc() {
			alert('alert')
		}
	}
}
</script>

<style lang="scss">
.placement-detail-page {

	.details-box {
		border-radius: 4px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
		padding: 0;
		background-color: #fafcfd;
	}

	.header-action {
		.tag {
			margin-left: 1rem;
		}
	}

	.apply-box {
		padding: 0.4rem;
		padding-left: 0;
	}

	.job-section {
		border-bottom: solid 1px #ddd;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;

		.section-header {
			display: block;
			margin-bottom: 1rem;
		}
	}

	.job-header {
		padding: 2.5rem;
		background: #3273dc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px 4px 0 0;
		box-shadow: inset 0px -8px 16px rgba(0, 0, 0, 0.2);

		.title {
			margin-bottom: 0;
			color: #fff;
		}

		.subtitle {
			color: #1d4586;
			font-weight: bold;
			margin-top: 0.5rem;
		}
	}

	.job-description {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.eligibility-criteria {
		padding-left: 1.5rem;
		padding-right: 1.5rem;

		.stripe-footer {
			.column {
				padding: 1rem;
				text-align: center;
			}
		}
	}



	.hiring-process {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.processes {
		max-width: 400px;
		width: 100%;
		margin: auto;
		text-align: center;
		position: relative;
		&::after{
			position: absolute;
			content: '';
			height: 100%;
			width: 2px;
			background: #ddd;
			top: 0;
			left: 50%;
			margin-left: -1px;
			z-index: 2;
		}

		.box {
			text-align: center;
		}

		.application{
			width: 50%;
			margin-left: 100px;
			padding-top: 10px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 10px;
		}

		.offer{
			width: 50%;
			margin-left: 100px;
			padding-top: 10px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 10px;
		}

		.button {
			pointer-events: none;
			.icon {
				margin-right: 0.5rem;
				.fa {
					font-size: 1rem;
				}
			}
		}

		.process {
			position: relative;
			margin: 2rem 0;
			z-index: 5;
			&:first-child:before{
				display: none;
			}
			&:last-child{
				padding-top: 0.3rem;
			}
			&:before {
				left: 47.5%;
				top: -11%;
				position: absolute;
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid #ddd;
				content: ' ';
			}
		}
	}

	.select-all-checkbox{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.applicant-button{
		margin-top:  0rem;
		margin-left: 0rem;
	}

	.close-btn{
		margin-left: 18.2rem;
	}

	.offer-btn{
		margin-left: 23.5em;
	}

	.applicant-list{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.gd-students{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.technical-students{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.hr-students{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.offer-letter-students{
		margin-top: 0.5rem;
		margin-left: 2rem;
	}

	.button-move{
		margin-top:  0.5rem;
		margin-left: 2rem;
	}

	.view-profile{
		float: right;
	}

	li{
		padding: 0.2rem;
	}

	.edit-btn{
		margin-top: 0.60rem;
		margin-right: 1rem;
	}

	.stripe-footer {
		border-bottom: solid 1px #ddd;
	}
}
</style>
