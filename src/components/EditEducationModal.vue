<template>
	<div class="account-setting-modal">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">

				<header class="modal-card-head">
					<p class="modal-card-title">Student Education Modal</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>

				<section class="modal-card-body">

					<div class="details">

						<div class="field">
							<label class="label">Education</label>
							<p class="control">
								<dropdown :ed_id="ed_id"></dropdown>
							</p>
						</div>

						<div class="field">
							<label class="label">College/School</label>
							<p class="control">
								<input v-validate="'required'" v-model="this.education.clg_school = userEd.clg_school" class="input" type="text" name="collegeSchool" placeholder="College/School">
							</p>
							<div class="help is-danger" v-show="errors.has('collegeSchool')">
								{{ errors.first('collegeSchool') }}
							</div>
						</div>

						<div class="field">
							<label class="label">CPI</label>
							<p class="control">
								<input v-validate="'required'" v-model="this.education.cpi = userEd.cpi" class="input" type="number" name="cpi" placeholder="CPI">
							</p>
							<div class="help is-danger" v-show="errors.has('cpi')">
								{{ errors.first('cpi') }}
							</div>
						</div>

						<div class="field">
							<label class="label">Start Year</label>
							<p class="control">
								<!-- <input v-model="userEd.start_year" class="input" type="text" name="startYear" placeholder="Start Year"> -->
								<datepicker v-validate="'required'" v-model="this.education.start_year = userEd.start_year" name="start_year" placeholder="Start Year" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
								</datepicker>
							</p>
							<div class="help is-danger" v-show="errors.has('start_year')">
								{{ errors.first('start_year') }}
							</div>
						</div>

						<div class="field">
							<label class="label">End Year</label>
							<p class="control">
								<!-- <input v-model="userEd.end_year" class="input" type="text" name="endYear" placeholder="End Year"> -->
								<datepicker v-validate="'required'" v-model="this.education.end_year = userEd.end_year" name="end_year" placeholder="Start Year" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
								</datepicker>
							</p>
							<div class="help is-danger" v-show="errors.has('end_year')">
								{{ errors.first('end_year') }}
							</div>
						</div>

						<div class="field">
							<label class="label">Drive Link</label>
							<p class="control">
								<input v-validate="'required'" v-model="this.education.drive_link = userEd.drive_link" class="input" type="text" name="driveLink" placeholder="Enter Drive Link">
							</p>
							<div class="help is-danger" v-show="errors.has('driveLink')">
								{{ errors.first('driveLink') }}
							</div>
						</div>
					</div>

				</section>

				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndUpdateEducation">Update</a>
					<!-- <pre>{{$data.education}}</pre> -->
					<a class="button close-btn" @click="$emit('close')">Close</a>
				</footer>

			</div>
		</div>
	</div>
</template>

<script>
import EducationDropDown from '@/components/EducationDropdown'
import Datepicker from 'vue-bulma-datepicker'
import Auth from '@/packages/auth/Auth'
import user from '@/api/user'

export default{
	name: 'account-setting-modal',
	components: {
		dropdown: EducationDropDown,
		Datepicker
	},
	props: {
		userEd: {
			required: true,
			type: Object
		}
	},
	created() {
		this.ed_id = this.userEd.education_id;
		this.$bus.$on('education-change', (response) => {
			this.education.education_id = response.id;
		});
	},
	data() {
		return {
			ed_id: null,
			education: {
				education_id: null,
				clg_school: '',
				cpi: null,
				drive_link: '',
				start_year: '',
				enroll_no: null
			}
		};
	},
	methods: {
		validateAndUpdateEducation() {
			this.validate().then(() => {
				// console.log(this.getUserId()+"-"+ this.education.education_id+"-"+ this.education.clg_school+"-"+
				// 	this.education.start_year+"-"+ this.education.end_year+"-"+ this.education.drive_link+"-"+ this.education.cpi);
				user.updateUserEducation(this.getUserId(), this.education.education_id, this.education.clg_school,
					this.education.start_year, this.education.end_year, this.education.drive_link, this.education.cpi)
					.then((response) => {
						if(response.status == 200) {
							alert('Updated Successfully');
							this.$emit('close');
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
			}
		}
	}
	</script>

	<style lang="scss">
	.account-setting-modal{
		.close-btn{
			margin-left: 28rem;
		}

		.field{
			margin-left: 1rem;
			margin-right: 1rem;
		}
	}
	</style>
