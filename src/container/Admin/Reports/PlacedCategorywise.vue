<template>
	<div class="placed-students">


		<div class="field dropdown-category">
			<p class="control">
				<category-dropdown></category-dropdown>
			</p>
		</div>

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
				<div class="column">
					<span class="title is-4">Package</span>
				</div>
				<div class="column is-4">
					<span class="title is-4">Company</span>
				</div>
			</div>

			<div class="columns section-body">
				<div class="column">
					<span class="texts">201612105</span>
				</div>
				<div class="column is-4">
					<span class="texts">Sagar Makhija Gurmukh</span>
				</div>
				<div class="column">
					<span class="texts">Msc(IT)</span>
				</div>
				<div class="column">
					<span class="texts">500000</span>
				</div>
				<div class="column is-4">
					<span class="texts">XYZ Company Pvt. Ltd.</span>
				</div>
			</div>
		</div>

		<div class="no-students" v-if="!showData">
			<h3 class="title">No Students have been Placed!</h3>
		</div>

		<!-- <div class="section-body" v-for="student in students">
		<span class="title is-5">{{ student.id }}</span>
		<span>{{ student.name }}</span>
	</div> -->

</div>
</template>

<script>
import CategoryDropdownAdmin from '@/components/CategoryDropdownAdmin';
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';

export default {
	name: 'placed-students',
	components: {
		'category-dropdown': CategoryDropdownAdmin,
	},
	data() {
		return {
			students: [ ],
			season_id: null,
			category_id: 1,
			showData: false
		}
	},
	created() {
		this.season_id = this.$route.params.season_id;
		this.getStudentsPlacedCategorywise();

		this.$bus.$on('category-change1', (response) => {
			this.category_id = response.category_id;
			this.getStudentsPlacedCategorywise();
		});

	},
	methods: {
		getStudentsPlacedCategorywise() {
			admin.getStudentsPlacedCategorywise(this.getUserId(), this.season_id, this.category_id)
			.then((response) => {
				if(response.data == 'No Student got Offer!') {
					this.showData = false;
				}
				else if (response.data == "No student of this category registered!") {
					this.showData = false;
				}
				else {
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
	},
}
</script>

<style lang="scss">
.placed-students {
	margin-bottom: 2rem;
	padding: 1rem;
	padding-top: 0;

	.dropdown-category {
		padding-top: 1rem;
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

	.no-students {
		padding: 1rem;
	}

}
</style>
