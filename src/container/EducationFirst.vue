<template>
	<div class="education-registration">
		<div class="container">
			<div class="box" v-if="index == 0" v-for = "ed_id,index in educationArr">

				<div class="education-header">
					<h2 class="title">Education</h2>
				</div>

				<input v-model="edDetails.education_id = ed_id" type="hidden">

				<div class="education-body">
					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Enrollment Number</label>
								<p class="control">
									<input disabled v-model="enroll_no" class="input" name="enrollment-number" v-validate="'required'" type="number" placeholder="Enrollment Number">
								</p>
								<div v-show="errors.has('enrollment-number')" class="help is-danger">
									The Enrollment number is required and should contain only numbers.
								</div>
							</div>
						</div>

						<div class="column">
							<div class="field">
								<label class="label">Education</label>
								<p class="control">
									<education-dropdown :ed_id="ed_id"></education-dropdown>
								</p>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">College/School</label>
								<p class="control">
									<input v-model="edDetails.clg_school" class="input" name="college_school" v-validate="'required'" type="text" placeholder="College/School">
								</p>
								<div v-show="errors.has('college_school')" class="help is-danger">
									The College/School is required and should contain only letters.
								</div>
							</div>
						</div>

						<div class="column">
							<div class="field">
								<label class="label">CPI</label>
								<p class="control">
									<input v-model="edDetails.cpi" class="input" name="cpi" v-validate="'required|max_value:10'" type="number" placeholder="CPI">
								</p>
								<div v-show="errors.has('cpi')" class="help is-danger">
									The CPI is required and should not be greater than 10.
								</div>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Start Year</label>
								<p class="control">
									<datepicker v-model="edDetails.start_year" name="start_date" placeholder="Start Year" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
									</datepicker>
								</p>
								<div v-show="errors.has('start_date')" class="help is-danger">
									The Start Year is required.
								</div>
							</div>
						</div>

						<div class="column">
							<div class="field">
								<label class="label">End Year</label>
								<p class="control">
									<datepicker v-model="edDetails.end_year" name="start_date" placeholder="End Year" :config="{ dateFormat: 'Y-m-d', wrap: true, static: true }">
									</datepicker>
								</p>
								<div v-show="errors.has('end_date')" class="help is-danger">
									The End Year is required.
								</div>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Drive Link &nbsp;<small><a class="is-success is-small">Learn how to do</a></small></label>
								<p class="control">
									<input v-model="edDetails.drive_link" class="input" name="drive_link" v-validate="'required|url'" type="text"
									placeholder="Drive Link">
								</p>
								<div v-show="errors.has('drive_link')" class="help is-danger">
									The Drive Link is required.
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="field education-button">
					<p class="has-text-centered">
						<button class="button is-success submit-button" @click="validateAndAddNewEducation">
							Save and Next
						</button>
						<button class="button is-success submit-button" v-if="oneLeft" @click="validateAndAddNewEducation">
							Finish
						</button>
					</p>
				</div>

				<!-- <pre>{{$data}}</pre> -->
			</div>
		</div>

	</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import EducationDropdown from '@/components/EducationDropdown'
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default{
	name: 'education-registration',
	components: {
		Datepicker,
		EducationDropdown
	},
	data() {
		return {
			stringBtech: '',
			oneLeft: false,
			educationArr: [],
			ed_id: null,
			enroll_no: null,
			edDetails: {
				education_id: null,
				clg_school: '',
				cpi: null,
				start_year: '',
				end_year: '',
				drive_link: ''
			}
		};
	},
	created() {
		this.getUserDetails();
		this.getUserEdForCat();
	},
	methods: {
		getUserDetails() {
			user.getUserDetails(this.getUserId())
			.then((response) => {
				// console.log('UserDetails');
				// console.log(response.data.category.name == 'BTECH');
				this.stringBtech = response.data.category.name;
				this.enroll_no = response.data.enroll_no;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserEdForCat() {
			user.getUserEducationForCategory(this.getUserId())
			.then((response) => {
				try {
					if(this.stringBtech.match(/btech/i).length == 1 && response.data.length == 3) {
						this.edDetails.clg_school = 'Dhirubhai Ambani Institute of Information and Communication Technology';
					}
				} catch (e) {
					console.log(e.message);
				}
				if(response.data.length == 0) {
					this.$router.push({ name: 'home' });
				}
				else {
					if(response.data.length == 4) {
						 this.edDetails.clg_school = 'Dhirubhai Ambani Institute of Information and Communication Technology';
					}
					this.educationArr = response.data;
					if(this.educationArr.length == 1) {
						this.oneLeft = true;
					}
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			return Auth.getUserToken();
		},
		validateAndAddNewEducation() {
			this.validate()
			.then(() => {
				user.postNewUserEducation(this.getUserId(), this.edDetails.education_id, this.edDetails.clg_school,
				this.edDetails.cpi, this.edDetails.start_year, this.edDetails.end_year, this.edDetails.drive_link)
				.then((response) => {
					if(response.status == 200) {
						// let toast = this.$toasted.success("Education Details Entered. Now Proceed to fill the Next Details", {
						// 	theme: "outline",
						// 	position: "top-center",
						// 	duration : 3000
						// });
						this.getUserEdForCat();
						// this.$router.replace({ name: 'education-first', force: true	 });
						setTimeout(location.reload(), 7000);
					}
				})
				.catch((error) => {
					console.log(error);
				})
			})
			.catch((error) => {
				console.log(error);
			})
		},
		validate() {
			return this.$validator.validateAll();
		},
		getUserId() {
			return Auth.getUserToken();
		},
		home() {
			this.$router.push({ name: 'home' });
		}
	}
}
</script>

<style lang="scss">
.education-registration {

	.container {
		padding: 0;
		max-width: 750px;
		width: 100%;
		margin: auto;
	}

	.box {
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding: 0;
		border-radius: 4px;
		box-shadow: 0px 4px 5px #d0cfcf;
	}

	.education-header {
		padding: 1rem;
		border-bottom: solid 1px #ddd;
	}

	.education-body {
		padding: 1.5rem;
	}

	.education-button {
		padding: 1rem;
		border-top: solid 1px #ddd;
	}

}
</style>
