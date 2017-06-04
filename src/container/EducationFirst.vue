<template>
	<div class="education-registration">
		<div class="container">
			<div class="box">

				<div class="education-header">
					<h2 class="title">Education</h2>
				</div>

				<div class="education-body">
					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Enrollment Number</label>
								<p class="control">
									<input class="input" name="enrollment-number" v-validate="'required|number'" type="number" placeholder="Enrollment Number">
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
									<category-dropdown></category-dropdown>
								</p>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">College/School</label>
								<p class="control">
									<input class="input" name="college_school" v-validate="'required|alpha_spaces'"
									type="text" placeholder="College/School">
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
									<input class="input" name="cpi" v-validate="'required|number'" type="number"
									placeholder="CPI">
								</p>
								<div v-show="errors.has('cpi')" class="help is-danger">
									The CPI is required.
								</div>
							</div>
						</div>
					</div>

					<div class="columns">
						<div class="column">
							<div class="field">
								<label class="label">Start Year</label>
								<p class="control">
									<datepicker name="start_date" placeholder="Start Year"
									:config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
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
								<datepicker name="start_date" placeholder="End Year"
								:config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
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
							<input class="input" name="drive_link" v-validate="'required|alpha_num_dash'" type="text"
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
				<button name="company" class="button is-success submit-button">
					Save
				</button>
			</p>
		</div>


	</div>
</div>

</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import CategoryDropdown from '@/components/CategoryDropdown'
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default{
	name: 'education-registration',
	components: {
		Datepicker,
		CategoryDropdown
	},
	data() {
		return {
			categoriesArr: []
		};
	},
	created() {
		this.getUserEdForCat();
	},
	methods: {
		getUserEdForCat() {
			console.log('called');
			user.getUserEducationForCategory(this.getUserId())
			.then((response) => {
				this.categoriesArr = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		getUserId() {
			return Auth.getUserToken();
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
