<template>
	<div class="placement-detail-page">
		<div class="details box">

			<div class="job-header job-section" v-if="placementDescription.company">
				<div class="heading-main">
					<p class="title is-3 job-title">{{ placementDescription.job_title }}</p>
					<p class="subtitle is-6 company-details">{{ placementDescription.company.company_name }}, {{ placementDescription.location }}</p>
				</div>
				<div class="header-action is-pulled-right">
					<span v-if="placementDescription.status == 'closed'" class="tag is-light">{{ placementDescription.status }}</span>
					<span v-if="placementDescription.status == 'application'" class="tag is-success">{{ placementDescription.status }}</span>
					<div class="apply-box">
						<a @click="showReOpen = !showReOpen" v-if="placementDescription.status == 'closed'"
						class="button is-success">Re Open</a>
						<a @click="showExternalAllow = true" v-if="placementDescription.status == 'application'"
						class="button is-success ex-allow">External Allow</a>
					</div>
				</div>
			</div>

			<ReOpenModal v-if="showReOpen" @close="showReOpen = false"></ReOpenModal>
			<ExternalAllow v-if="showExternalAllow" @close="showExternalAllow = false"></ExternalAllow>

			<div class="job-description job-section">
				<b class="section-header">Job Description
					<div class="header-action is-pulled-right">
						<div class="button is-white" @click="showDesc = !showDesc" v-if="!showDesc &&
						placementDescription.status == 'application'"> {{show}} </div>
						<div class="button is-white" @click="showDesc = !showDesc" v-if="showDesc"> {{hide}} </div>
					</div>
				</b>

				<p>{{ placementDescription.job_description }}</p>
				<PlacementDriveEditBox :placementDescription="placementDescription" v-if="showDesc"></PlacementDriveEditBox>
			</div>

			<div class="eligibility-criteria job-section">
				<b class="section-header">Eligibility Criteria
					<div class="header-action is-pulled-right">
						<div class="button is-white" @click="showOpenFor = true"> Add </div>
					</div>
				</b>

				<OpenForModal v-if="showOpenFor" @close="showOpenFor = !showOpenFor" :placementDescription="placementDescription">
				</OpenForModal>

				<div class="columns is-multiline margin-set">

					<div class="column is-half" v-for="categories in placementDescription.categories">
						<div class="card">
							<header class="card-header">
								<p class="card-header-title"> {{ categories.name }} </p>
								<div class="header-action is-pulled-right edit-btn top-add-delete">
									<input type="hidden" v-model="category_id = categories.id">
									<a @click="askCatDelete(categories.id)" class="button is-white delete-btn">
										Delete </a>
									</div>
								</header>

								<footer class="stripe-footer">
									<div class="columns">
										<div class="column" v-for="cat in categories.criterias">{{ cat.education.name }} <br> {{cat.cpi_required}}</div>
									</div>
								</footer>
								<div>
									<edit-criteria-box v-if="placementDescription.status == 'application'" :key="categories.id"
									:criterias="categories.criterias"></edit-criteria-box>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="hiring-process job-section">
					<b class="section-header hiring">
						<span>Hiring Process</span>
						<div class="header-action">
							<div class="button is-white" @click="showAddSelection = true"> Add </div>
							<a v-if="!allowListingData" @click="allowListing" class="button is-small">Allow User Listing</a>
							<a disabled v-if="allowListingData" class="button is-small">The Details have been Allowed</a>
						</div>
					</b>

					<AddSelectionRound :lastDateRegistration="lastDateRegistration" v-if="showAddSelection"></AddSelectionRound>

					<div class="processes">

						<div class="process-application process">
							<div class="box application">
								<p>Application</p>
								<div class="view-info">
									<router-link :to="{ name: 'selection-rounds', params: { placement_id: placement_id } }" class="is-success">View info</router-link>
								</div>
							</div>
						</div>

						<div class="box process" v-for="round in placementDescription.placement_selection">
							<div class="flex-css">
								<span></span>
								<p class="flex">{{ round.round_name }}</p>
								<a class="is-danger" @click="askDeleteSelectionRound">Delete</a>
							</div>
							<router-link :to="{ name: 'selection-rounds-dynamic', params: { placement_id: placement_id, round_id:round.round_no} }" class="is-success">View info</router-link><br>
							<set-venue-date :key="round.id" :round="round"></set-venue-date>
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
	import ReOpenModal from '@/components/Admin/PlacementDriveDescription/ReOpenModal'
	import ExternalAllow from '@/components/Admin/PlacementDriveDescription/ExternalAllow';
	import PlacementDriveEditBox from '@/components/Admin/PlacementDriveDescription/PlacementDriveEditBox';
	import EditEligibilityCriteriaBox from '@/components/Admin/PlacementDriveDescription/EditEligibilityCriteriaBox';
	import SetVenueDate from '@/components/Admin/PlacementDriveDescription/SetVenueDate';
	import OfferModal from '@/components/Admin/PlacementDriveDescription/OfferModal';
	import OpenForModal from '@/components/Admin/PlacementDriveDescription/OpenForModal';
	import AddEligibilityCriteria from '@/components/Admin/PlacementDriveDescription/AddEligibilityCriteria';
	import AddSelectionRound from '@/components/Admin/AddSelectionRound';

	export default {
		name: 'placement-detail-page',

		components: {
			ReOpenModal,
			ExternalAllow,
			PlacementDriveEditBox,
			'edit-criteria-box': EditEligibilityCriteriaBox,
			'set-venue-date': SetVenueDate,
			OfferModal,
			OpenForModal,
			AddEligibilityCriteria,
			AddSelectionRound
		},

		created() {
			this.season_id = this.$route.params.season_id;
			this.placement_id = this.$route.params.placement_id;
			this.checkAllowListing();
			this.getPlacementDetails();
			this.$bus.$on('closeDescription', () => {
				this.showDesc = false;
			});
			this.$bus.$on('close_date_model', () => {
				this.getPlacementDetails();
				this.showReOpen = false;
			});
			this.$bus.$on('close_external', () => {
				this.getPlacementDetails();
				this.showExternalAllow = false;
			});
			this.$bus.$on('criteria-deleted', () => {
				this.getPlacementDetails();
			});
			this.$bus.$on('close', () => {
				this.showOpenFor = false;
				this.getPlacementDetails();
			})
		},

		data() {
			return {
				allowListingData: false,
				season_id: null,
				placement_id: null,
				placementDescription: { },
				showDesc: false,
				showCriteria: false,
				criteriaId: null,
				hide: "Hide",
				show: "Edit",
				re_open_modal: false,
				showExternalAllow: false,
				showReOpen: false,
				showVenue: false,
				showOpenFor: false,
				showAddEligibilityCriteria: false,
				showAddSelection: false,
				lastDateRegistration: '',
			}
		},

		methods: {
			checkAllowListing() {
				//check if listing allowed or not
				admin.isStudentDataAllowed(this.getUserId(), this.placement_id)
				.then((response) => {
					if(response.data.status == false) {
						this.allowListingData = false;
					}
					else {
						this.allowListingData = true;
					}
				})
				.catch((error) => {
					console.log(error);
				})
			},

			allowListing() {
				admin.allowStudentData(this.getUserId(), this.placement_id)
				.then((response) => {
					if(response.status == 200) {
						let toast = this.$toasted.success("Details Allowed", {
							theme: "outline",
							position: "top-center",
							duration : 3000
						});
						this.checkAllowListing();
					}
				})
				.catch((error) => {
					console.log(error);
				})
			},

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
			},

			askCatDelete(id) {
				this.swal({
					// title: 'Are you sure?',
					text: "Delete the Category?",
					// type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#428aff',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					allowOutsideClick: true
				}).then(() => {
					this.delOpenFor(id);
				})
			},

			delOpenFor(category_id) {
				admin.deleteOpenFor(this.getUserId(), this.placement_id, category_id)
				.then((response) => {
					if(response.status == 204) {
						let toast = this.$toasted.error("Category Deleted", {
							theme: "outline",
							position: "top-center",
							duration : 3000
						});
						this.getPlacementDetails();
					}
				})
				.catch((error) => {
					console.log(error);
				})
			},

			askDeleteSelectionRound() {
	        this.swal({
	          // title: 'Are you sure?',
	          text: "Delete the Category?",
	          // type: 'warning',
	          showCancelButton: true,
	          confirmButtonColor: '#428aff',
	          cancelButtonColor: '#d33',
	          confirmButtonText: 'Yes',
	          allowOutsideClick: true
	        }).then(() => {
	          this.deleteSelectionRound();
	        })
	    },

			deleteSelectionRound() {
	      admin.deleteSelectionRound(this.getUserId(), this.placement_id, this.round_no)
	      .then((response) => {
	        //toast confirmation and close
	        let toast = this.$toasted.error("Round Deleted", {
	          theme: "outline",
	          position: "top-center",
	          duration : 3000
	        });
	        this.$bus.$emit('edit-selection-roundbox');
	        this.hidden = true;
	      })
	      .catch((error) => {
	        console.log(error);
	      })
	    },

		}
	}
	</script>

	<style lang="scss">
	.placement-detail-page {

		.details.box {
			border-radius: 4px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
			padding: 0;
		}

		.header-action {
			.tag {
				margin-left: 1rem;
			}
		}

		.re-open {
			border-bottom: solid 1px #ddd;
			padding-bottom: 1rem;
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

		.section-header.hiring {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.button.is-white {
				padding-top: 0;
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

		.heading-main {
			.job-title {
				padding: 0;
			}
		}


		.hiring-process {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}

		// .processes {
		// 	max-width: 400px;
		// 	width: 100%;
		// 	margin: auto;
		// 	text-align: center;
		// 	position: relative;
		// 	&::after{
		// 		position: absolute;
		// 		content: '';
		// 		height: 100%;
		// 		width: 2px;
		// 		background: #ddd;
		// 		top: 0;
		// 		left: 50%;
		// 		margin-left: -1px;
		// 		z-index: 2;
		// 	}
    //
		// 	.box {
		// 		text-align: center;
		// 	}
    //
		// 	.application{
		// 		width: 50%;
		// 		margin-left: 100px;
		// 		padding-top: 10px;
		// 		padding-left: 10px;
		// 		padding-right: 10px;
		// 		padding-bottom: 10px;
		// 	}
    //
		// 	.offer{
		// 		width: 50%;
		// 		margin-left: 100px;
		// 		padding-top: 10px;
		// 		padding-left: 10px;
		// 		padding-right: 10px;
		// 		padding-bottom: 10px;
		// 	}
    //
		// 	.button {
		// 		pointer-events: none;
		// 		.icon {
		// 			margin-right: 0.5rem;
		// 			.fa {
		// 				font-size: 1rem;
		// 			}
		// 		}
		// 	}
    //
		// 	.process {
		// 		position: relative;
		// 		margin: 2rem 0;
		// 		z-index: 5;
		// 		&:first-child:before{
		// 			display: none;
		// 		}
		// 		&:last-child{
		// 			padding-top: 0.3rem;
		// 		}
		// 		&:before {
		// 			left: 47.5%;
		// 			top: -11%;
		// 			position: absolute;
		// 			width: 0;
		// 			height: 0;
		// 			border-left: 10px solid transparent;
		// 			border-right: 10px solid transparent;
		// 			border-top: 10px solid #ddd;
		// 			content: ' ';
		// 		}
		// 	}
		// }

		.processes {
        max-width: 400px;
        width: 100%;
        margin: auto;
        text-align: center;
        position: relative;
        &::after {
            position: absolute;
            content: '';
            height: 100%;
            width: 2px;
            background: #ddd;
            top: 0;
            left: 50%;
            margin-left: -1px;
            // z-index: 2;
        }
        .box {
            text-align: center;
            padding: 1.25rem;
        }
        .application {
            // pointer-events: none;
            .icon {
                margin-right: 0;
                width: 13px;
                height: 16px;
                .fa {
                    font-size: 1rem;
                }
            }
        }

        .process {
            position: relative;
            margin: 2rem 0;
            z-index: 3;
            &:first-child:before {
                display: none;
            }
            &:last-child {
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

		.button-move {
			margin-top:  0.5rem;
			margin-left: 2rem;
		}

		.view-profile {
			float: right;
		}

		li {
			padding: 0.2rem;
		}

		.edit-btn {
			display: flex;
			align-items: center;
			height: 1%;
			.button {
			}
		}

		.stripe-footer {
			border-bottom: solid 1px #ddd;
		}

		.margin-set {
			margin: 0;
		}

		.flex-css {
			display: flex;
			justify-content: space-between;
			.flex {
				padding-left: 2.5rem;
			}
		}
	}
	</style>
