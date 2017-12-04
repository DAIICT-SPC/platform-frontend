<template>
	<div class="company-application-view-full-list">
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Full List</p>
					<div class="field has-addons">
						<p class="control">
							<input class="input search-bar" type="text" placeholder="Search" v-model="search">
						</p>
						<p class="control">
							<a class="button is-primary">
								Search
							</a>
						</p>
					</div>
				</header>

				<section class="modal-card-body">

					<div class="application-list">

						<div class="company-selection-body" v-for="st in students">
							<div class="">
								<input v-validate="'required'" :value="st.enroll_no" type="checkbox"
								class="checkbox" v-model="selected" name="terms">
								<span class="enroll"> {{ st.enroll_no }} </span>
								<span class="name"> {{ st.student.user.name }} </span>
							</div>
							<div class="catname">
								<span>{{ st.student.category.name }}</span>
							</div>
						</div>
					</div>

					<div class="help is-danger" v-show="errors.has('terms')">
						Please select at least one!
					</div>

					<div class="select-all">
						<input type="checkbox" name='selectCheckboxes' class="select-all-checkbox" v-model="selectAll" />
						<span>Select All</span>
					</div>

				</section>
				<footer class="modal-card-foot">
					<a class="button is-success" @click="validateAndDownloadResumes">Download Resumes</a>
					<a class="button cancel-btn" @click="$emit('close')">Close</a>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default{
	name: 'company-application-view-full-list',
	data() {
		return {
			search:'',
			selected: [],
			placement_id: null,
			students: [],
			modalValue: ''
		}
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.getApplicationList();
	},
	methods: {
		getApplicationList() {
			company.getApplicationList(this.getUserId(), this.placement_id)
			.then((response) => {
				this.students = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		validateAndDownloadResumes() {
			this.validate().then(() => {
				company.postDownloadResumes(this.getUserId(), this.selected)
				.then((response) => {
					if(response.status == 200) {
						this.modalValue = response.data;
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
	},




	computed: {
		selectAll: {
			get:function() {
				return this.students ? this.selected.length == this.students.length : false;
			},
			set:function(value) {
				var selected = [];
				if(value){
					this.students.forEach((student)=>{
						selected.push(student.enroll_no);
					})
				}
				this.selected = selected;
			}
		}
	}
}
</script>

<style lang="scss">
.company-application-view-full-list {

	.modal-card-body {
		// padding: 1rem;
	}

	.modal-card-title {
		padding-bottom: 0.5rem;
	}


	.application-list {

		.company-selection-body {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 350px;
			margin-left: 0;
			padding: 0.1rem;
			.enroll .name {
				padding-right: 0.2rem;
			}
			.catname {

			}
		}

	}

	.select-all {
		border-top: solid 1px #ddd;
		padding-top: 0.5rem;
		margin-top: 0.5rem;
		input {
			margin-right: 0.5rem;
		}
	}

}
</style>
