<template>
	<div class="unplaced-students">

		<div class="main" v-if="showData">
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
			</div>

			<div class="columns section-body" v-for="st in students">
				<div class="column">
					<span class="texts">{{st.enroll_no}}</span>
				</div>
				<div class="column is-4">
					<span class="texts">{{st.user.name}}</span>
				</div>
				<div class="column">
					<span class="texts">{{st.category.name}}</span>
				</div>
			</div>
		</div>

		<div class="no-students" v-if="!showData">
			<h3 class="title">No Students have been Unplaced!</h3>
		</div>

	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default{
	name: 'placed-students',
	created() {
		this.season_id = this.$route.params.season_id;
		this.getUnplacedStudents();
	},
	data() {
		return{
			students: [ ],
			season_id: null,
			showData: false
		};
	},
	methods: {
		getUnplacedStudents() {
			admin.getUnplacedStudents(this.getUserId(), this.season_id)
			.then((response) => {
				if(response.data == 'All Registered Student got placement!')
				{
					console.log('placed all');
					this.showData = false;
				}
				else if (response.data == 'No Student Registered for any placement!')
				{
					this.showData = false;
				}
				else
				{
					this.showData = true;
					this.students = response.data;
				}
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
.unplaced-students {
	margin-bottom: 2rem;
	padding: 1rem;
	padding-top: 0;

	.no-students {
		padding: 1rem;
	}

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
