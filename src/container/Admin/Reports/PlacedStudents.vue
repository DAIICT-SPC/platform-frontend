<template>
	<div class="placed-students">

		<div class="columns section-header">
			<div class="column">
				<span class="title is-4">EnrollNo</span>
			</div>
			<div class="column is-4">
				<span class="title is-4">Name</span>
			</div>
			<div class="column">
				<span class="title is-4">Category</span>
			</div>
			<div class="column">
				<span class="title is-4">Package</span>
			</div>
			<div class="column is-4">
				<span class="title is-4">Company</span>
			</div>
		</div>

		<div class="columns section-body" v-for="st in students">
			<div class="column">
				<span class="texts">{{st.enroll_no}}</span>
			</div>
			<div class="column is-4">
				<span class="texts">{{st.student.user.name}}</span>
			</div>
			<div class="column">
				<span class="texts">{{st.student.category.name}}</span>
			</div>
			<div class="column">
				<span class="texts">{{st.package}}</span>
			</div>
			<div class="column is-4">
				<span class="texts">{{st.placement.company.company_name}}</span>
			</div>
		</div>

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default{
	name: 'placed-students',
	created() {
		this.season_id = this.$route.params;
		this.getPlacedStudents();
	},
	data() {
		return{
			students: [ ],
			season_id: null
		};
	},
	methods: {
		getPlacedStudents() {
			admin.getPlacedStudents(this.getUserId(), this.season_id)
			.then((response) => {
				this.students = response.data;
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
.placed-students {

	margin-bottom: 2rem;
	padding: 1rem;
	padding-top: 0;

	.section-header {
		padding: 1rem;
		border-bottom: solid 1px #ddd;
		padding-bottom: 0;
	}

	.columns {
		margin: 0;
	}

	.section-body{
		margin-left: 1rem;
	}
}
</style>
