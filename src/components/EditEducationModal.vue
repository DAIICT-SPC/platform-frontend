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
								<span class="select is-fullwidth">
									<dropdown></dropdown>
								</span>
							</p>
						</div>

						<div class="field">
							<label class="label">College/School</label>
							<p class="control">
								<input v-model="userEd.clg_school" class="input" type="text" name="collegeSchool" placeholder="College/School">
							</p>
						</div>

						<div class="field">
							<label class="label">CPI</label>
							<p class="control">
								<input v-model="userEd.cpi" class="input" type="number" name="cpi" placeholder="CPI">
							</p>
						</div>

						<div class="field">
							<label class="label">Start Year</label>
							<p class="control">
								<input v-model="userEd.start_year" class="input" type="text" name="startYear" placeholder="Start Year">
							</p>
						</div>

						<div class="field">
							<label class="label">End Year</label>
							<p class="control">
								<input v-model="userEd.end_year" class="input" type="text" name="endYear" placeholder="End Year">
							</p>
						</div>

						<div class="field">
							<label class="label">Drive Link</label>
							<p class="control">
								<input v-model="userEd.drive_link" class="input" type="number" name="driveLink" placeholder="Enter Drive Link">
							</p>
						</div>
					</div>

				</section>

				<footer class="modal-card-foot">
					<a class="button is-success">Update</a>
					<a class="button close-btn" @click="$emit('close')">Close</a>
				</footer>

			</div>
		</div>
	</div>
</template>

<script>
import EducationDropDown from '@/components/EducationDropdown'
	export default{
		name: 'account-setting-modal',
		components: {
			dropdown: EducationDropDown
		},
		props: {
			userEd: {
				required: true,
				type: Object
			}
		},
		created() {
			console.log(this.userEd);
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
