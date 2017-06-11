<template>
	<div class="student-edit-modal">

		<!-- modal starts -->
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Modal title</p>
					<button class="delete" @click="$emit('close')"></button>
				</header>

				<section class="modal-card-body">

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Student ID</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input disabled v-validate="'required'" v-model="student_id = studentDetails.enroll_no" type="number" name="student_id" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('student_id')">
									{{errors.first('student_id')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Student Name</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<input disabled v-model="student_name = studentDetails.name" v-validate="'required'" type="text" name="student_name" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('student_name')">
									{{errors.first('student_name')}}
								</div>
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
									<input v-model="contact_no = studentDetails.contact_no" v-validate="'required'" type="number" name="contact_no" class="input">
								</p>
								<div class="help is-danger" v-show="errors.has('contact_no')">
									{{errors.first('contact_no')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Date of birth</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<datepicker v-model="dob = studentDetails.dob" v-validate="'required'" name="student_dob" placeholder="Date of Birth" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
									</datepicker>
								</p>
								<div v-show="errors.has('student_dob')" class="help is-danger">
									{{ errors.first('student_dob') }}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Gender</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<label class="radio">
										<input v-model="gender = studentDetails.gender" type="radio" v-validate="'required'" name="gender" value="Male">
										Male
									</label>
									<label class="radio">
										<input v-model="gender = studentDetails.gender" type="radio" v-validate="'required'" name="gender" value="Female">
										Female
									</label>
								</p>
								<div class="help is-danger" v-show="errors.has('gender')">
									{{errors.first('gender')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Permanent Address</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<textarea v-model="perm_address = studentDetails.perm_address" name="perm_address" v-validate="'required'" class="textarea" placeholder="Primary Address"></textarea>
								</p>
								<div class="help is-danger" v-show="errors.has('perm_address')">
									{{errors.first('perm_address')}}
								</div>
							</div>
						</div>
					</div>

					<div class="field is-horizontal abt-admin">
						<div class="field-label">
							<p>Temporary Address</p>
						</div>
						<div class="field-body">
							<div>
								<p class="control ">
									<textarea v-model="temp_address = studentDetails.temp_address" name="temp_address" v-validate="'required'" class="textarea" placeholder="Current Address"></textarea>
								</p>
								<div class="help is-danger" v-show="errors.has('temp_address')">
									{{errors.first('temp_address')}}
								</div>
							</div>
						</div>
					</div>


				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndUpdateStudentDetails">Save changes</a>
					<a class="button" v-on:click="$emit('close')">Cancel</a>
				</footer>
			</div>
		</div>
		<!-- modal ends -->

	</div>
</template>

<script>
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'
import Datepicker from 'vue-bulma-datepicker'
import CategoryDropdown from '@/components/CategoryDropdown'

export default{
	name: 'student-edit-modal',
	components: {
		Datepicker,
		CategoryDropdown
	},
	props: {
		studentDetails: {
			required: true,
			type: Object
		}
	},
	created() {
		this.$bus.$on('category-change-before', (category_obj) => {
			this.category = category_obj.id;
		});
	},
	data() {
		return {
			student_id: null,
			student_name: '',
			programme_name: '',
			contact_no: null,
			dob: '',
			gender: '',
			category: null,
			perm_address: '',
			temp_address: ''
		}
	},
	methods: {
		validateAndUpdateStudentDetails() {
			this.validate().then(() => {
				// postUserDetails(id, enroll_no, category_id, temp_address, perm_address, contact_no, dob, gender)
				user.postUserDetails(this.getUserId(), this.student_id, this.category, this.temp_address, this.perm_address,
				this.contact_no, this.dob, this.gender)
				.then((response) => {
					if(response.status == 200) {
						alert('Details Updated');
						//close modal
						this.$emit('close');
					}
				})
				.catch((error) => {
					console.log(error);
				})
				user.postUserPersonalDetails(this.getUserId(), this.student_name)
				.then((response) => {
				})
				.catch((error) => {
					console.log(error);
				})
			})
			.catch((error) => {
				console.log(error)
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

</style>
