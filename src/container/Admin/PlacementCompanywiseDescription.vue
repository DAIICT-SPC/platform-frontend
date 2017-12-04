<template>
	<div class="placement-detail-page">
		<div class="details-box">

			<div class="job-header job-section">
				<div class="heading-main">
					<p class="title is-3 job-title">Software Developer</p>
					<p class="subtitle is-6 company-details">DLF India Pvt. Ltd. Noida, India</p>
				</div>
				<div class="header-action is-pulled-right">
					<span class="tag">Application</span>
				</div>
			</div>

			<div class="job-description job-section">
				<b class="section-header">Detail
					<div class="header-action is-pulled-right">
						<a class="is-primary">Edit</a>
					</div>
				</b>

				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
					dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>

				<div class="eligibility-criteria job-section">
					<b class="section-header">Eligibility Criteria
						<div class="header-action is-pulled-right">
							<a class="is-primary">Edit</a>
						</div>
					</b>
					<div class="columns">
						<div class="column">
							<div class="card">
								<header class="card-header">
									<p class="card-header-title"> B.Tech </p>
								</header>
								<footer class="stripe-footer">
									<div class="columns is-gapless is-mobile">
										<div class="column">Current <br> 7.01</div>
										<div class="column">Higher <br> 7.01</div>
										<div class="column">Secondary <br> 7.01</div>
									</div>
								</footer>
							</div>
						</div>
						<div class="column">
							<div class="card">
								<header class="card-header">
									<p class="card-header-title"> MScIT </p>
								</header>
								<footer class="stripe-footer">
									<div class="columns is-mobile is-gapless">
										<div class="column">Current <br> 7.01</div>
										<div class="column">Bachelors <br> 7.01</div>
										<div class="column">Higher <br> 7.01</div>
										<div class="column">Secondary <br> 7.01</div>
									</div>
								</footer>
							</div>
						</div>
					</div>
				</div>

				<div class="hiring-process job-section">
					<b class="section-header">Hiring Process
						<div class="header-action is-pulled-right">
							<a class="is-primary">Edit</a>
						</div>
					</b>

					<div class="processes">

						<div class="process-application process">
							<div class="box application">
								<p>Application</p>
								<div class="view-info">
									<a class="is-success" v-on:click="showViewModal=true">View info</a>
								</div>
							</div>
						</div>

						<div class="box process">
							<p>Group Discussion</p>
							<a class="is-success" v-on:click="showGDModal=true">View info</a>
						</div>

						<div class="box process">
							<p>Technical Interview</p>
							<a class="is-success" v-on:click="showTechnicalmodal=true">View info</a>
						</div>

						<div class="box process">
							<p>HR Interview</p>
							<a class="is-success" v-on:click="showHRmodal=true">View info</a>
						</div>

						<div class="process-offer process">
							<div class="box offer">
								<p>Offer</p>
								<a class="is-success" v-on:click="showOffer=true">View info</a>
							</div>
						</div>

					</div>
				</div>
			</div>


			<div class="box" v-if="showApplicantModal">
				<div class="modal is-active">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">Applicants</p>
							<button class="button is-success" v-on:click="showViewModal=true">View Full-List</button>
						</header>
						<section class="modal-card-body">
							<b>Applicants</b>

							<ul class="applicant-list">
								<li v-for="applicant in applicants">
									<input type="checkbox" class="checkbox"></input> &nbsp;&nbsp;{{ applicant.id }} - {{ applicant.name }} <a class="is-success view-profile">View Profile</a>
								</li>
							</ul>

							<input type="checkbox" class="select-all-checkbox">&nbsp;&nbsp;&nbsp;Select All</input>
						</section>
						<footer class="modal-card-foot">
							<a class="button is-primary back-button">Back</a>
							<a class="button is-primary applicant-button">Move to next round</a>
							<a class="button close-btn" v-on:click="showApplicantModal=false">Close</a>
						</footer>
					</div>
				</div>
			</div>

			<div class="box" v-if="showGDModal">
				<div class="modal is-active">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">Group Discussion</p>
							<button class="button is-success">View Full-List</button>
						</header>
						<section class="modal-card-body">
							<b class="section-header">Detail
								<div class="header-action is-pulled-right">
									<a class="is-primary">Edit</a>
								</div>
							</b>
							<br>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>

							<br>
							<b>List of Students</b>
							<ul class="gd-students">
								<li v-for="student in GDstudents">
									<input class="checkbox" type="checkbox" name="checkbox">&nbsp;&nbsp;
									{{ student.id }} - {{ student.name }}
								</li>
							</ul>
							<input type="checkbox" class="select-all-checkbox">&nbsp;&nbsp;&nbsp;Select All</input>
						</section>
						<footer class="modal-card-foot">
							<a class="button is-primary back-button">Back</a>
							<a class="button is-primary gd-button">Move to next round</a>
							<a class="button close-btn" v-on:click="showGDModal=false">Close</a>
						</footer>
					</div>
				</div>
			</div>

			<div class="box" v-if="showTechnicalmodal">
				<div class="modal is-active">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">Technical Interview</p>
							<button class="button is-success">View Full-List</button>
						</header>
						<section class="modal-card-body">
							<b class="section-header">Detail
								<div class="header-action is-pulled-right">
									<a class="is-primary">Edit</a>
								</div>
							</b>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							<br>
							<b>List of Students</b>
							<ul class="technical-students">
								<li v-for="student in Technicalstudents">
									<input class="checkbox" type="checkbox" name="checkbox">&nbsp;&nbsp;
									{{ student.id }} - {{ student.name }}
								</li>
							</ul>
							<input type="checkbox" class="select-all-checkbox">&nbsp;&nbsp;&nbsp;Select All</input>
						</section>
						<footer class="modal-card-foot">
							<a class="button is-primary back-button">Back</a>
							<a class="button is-primary gd-button">Move to next round</a>
							<a class="button close-btn" v-on:click="showTechnicalmodal=false">Close</a>
						</footer>
					</div>
				</div>
			</div>

			<div class="box" v-if="showHRmodal">
				<div class="modal is-active">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">HR Interview</p>
							<button class="button is-success">View Full-List</button>
						</header>
						<section class="modal-card-body">
							<b class="section-header">Detail
								<div class="header-action is-pulled-right">
									<a class="is-primary">Edit</a>
								</div>
							</b>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							<br>
							<b>List of Students</b>
							<ul class="hr-students">
								<li v-for="student in HRstudents">
									<input class="checkbox" type="checkbox" name="checkbox">&nbsp;&nbsp;
									{{ student.id }} - {{ student.name }}
								</li>
							</ul>
							<input type="checkbox" class="select-all-checkbox">&nbsp;&nbsp;&nbsp;Select All</input>
						</section>
						<footer class="modal-card-foot">
							<a class="button is-primary back-button">Back</a>
							<a class="button is-primary gd-button">Move to next round</a>
							<a class="button close-btn" v-on:click="showHRmodal=false">Close</a>
						</footer>
					</div>
				</div>
			</div>

			<div class="box" v-if="showOffer">
				<div class="modal is-active">
					<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title">Offer Letter</p>
							<button class="delete" v-on:click="showOffer=false"></button>
						</header>
						<section class="modal-card-body">
							<b class="section-header">Detail
								<div class="header-action is-pulled-right">
									<a class="is-primary">Edit</a>
								</div>
							</b>

							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
							<br>
							<b>List of Students</b>
							<ul class="offer-letter-students">
								<li v-for="student in Offerstudents">
									<input class="checkbox" type="checkbox" name="checkbox">&nbsp;&nbsp;
									{{ student.id }} - {{ student.name }}
								</li>
							</ul>
							<input type="checkbox" class="select-all-checkbox">&nbsp;&nbsp;&nbsp;Select All</input>
						</section>
						<footer class="modal-card-foot">
							<a class="button is-primary gd-button">Give Offer Letter</a>
							<a class="button offer-btn" v-on:click="showOffer=false">Cancel</a>
						</footer>
					</div>
				</div>
			</div>

		</div>
	</template>

	<script>

	export default {
		name: 'placement-detail-page',
		data(){
			return{

				showViewModal: false,
				temp: true,

				applicants: [
					{ id: 201615011, name: 'Student 1'},
					{ id: 201612051, name: 'Student 2'},
					{ id: 201120255, name: 'Student 3'},
					{ id: 115215422, name: 'Student 4'},
					{ id: 115215422, name: 'Student 5'},
					{ id: 115215422, name: 'Student 6'},
					{ id: 115215422, name: 'Student 7'},
					{ id: 115215422, name: 'Student 8'},
					{ id: 115215422, name: 'Student 9'},
					{ id: 115215422, name: 'Student 10'}
				],

				GDstudents: [
					{ id: 201120255, name: 'Student 3'},
					{ id: 115215422, name: 'Student 4'},
					{ id: 115215422, name: 'Student 5'},
					{ id: 115215422, name: 'Student 6'},
					{ id: 115215422, name: 'Student 7'}
				],

				Technicalstudents:[
					{ id: 115215422, name: 'Student 4'},
					{ id: 115215422, name: 'Student 5'},
					{ id: 115215422, name: 'Student 6'}
				],

				HRstudents:[
					{ id: 115215422, name: 'Student 5'},
					{ id: 115215422, name: 'Student 6'}
				],

				Offerstudents: [
					{ id: 115215422, name: 'Student 6'}
				],

				showApplicantModal: false,
				showGDModal: false,
				showTechnicalmodal: false,
				showHRmodal: false,
				showOffer: false
			}
		},

	}
	</script>

	<style lang="scss">
	.placement-detail-page {

		.details-box {
			border-radius: 4px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
			padding: 0;
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
	}
	</style>
