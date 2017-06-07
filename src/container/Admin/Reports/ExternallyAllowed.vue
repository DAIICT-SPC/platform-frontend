<template>
	<div class="external-students">
		<div v-if="showData">
			<div class="columns section-header">
				<div class="column">
					<span class="title is-4">EnrollNo</span>
				</div>
				<div class="column is-4">
					<span class="title is-4">Job Title</span>
				</div>
				<div class="column">
					<span class="title is-4">Allowed</span>
				</div>

			</div>

			<div class="columns section-body" v-for="st in students">
				<div class="column">
					<span class="texts">{{st.enroll_no}}</span>
				</div>
				<div class="column is-4">
					<span class="texts">{{st.placements[0].job_title}}</span>
				</div>
				<div class="column is-4">
					<span class="texts">{{st.users[0].name}}</span>
				</div>
			</div>
		</div>
		<div v-if="!showData">
			<h2 class="title">No Data Available</h2>
		</div>
	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default{
	name: 'external-students',
	created() {
		this.season_id = this.$route.params.season_id;
		this.getExternalAllowedStudents();
	},
	data() {
		return{
			students: [ ],
			season_id: null,
			showData: true
		};
	},
	methods: {
		getExternalAllowedStudents() {
			admin.getExternalAllowedStudents(this.getUserId(), this.season_id)
			.then((response) => {
				this.students = response.data;
				console.log(response.data);
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
.external-students {
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
