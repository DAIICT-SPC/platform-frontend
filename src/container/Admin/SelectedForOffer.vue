<template>
  <div class="selection-rounds">
		<div class="box">
			<!-- <div v-if="showData"> -->
			<div v-if="">
				<div class="selection-header">
					<h3 class="title">Offers <span class="subtitle">(Remaining)</span></h3>
					<button class="button is-success">View Full-List</button>
				</div>

				<!-- <div v-for="studentData in remainingStudents"> -->
				<div>
					<!-- <div class="selection-body" v-if="studentData.user"> -->
					<div class="selection-body">
						<!-- <input  :value="studentData.enroll_no" type="checkbox" name="checkbox" class="checkbox"> -->
						<input  type="checkbox" name="checkbox" class="checkbox">
						<span class="enroll title is-4">RollNo</span>
						<span class="name title is-4">Name</span>
						<span class="category title is-4">Category Name</span>
						<a class="is-success view-profile"> View Profile </a>
					</div>
				</div>

				<div class="selection-checkbox">
					<input type="checkbox" class="checkbox" />
					<span class="text title is-4">Select All</span>
				</div>

				<div class="selection-footer">
					<router-link :to="{ name: 'placements-drive-description', params: { placement_id: placement_id } }" class="button is-primary back-button">Back</router-link>
					<a class="button is-primary applicant-button" @click="moveStudentsToNextRound">Move to next round</a>
					<a class="button close-btn">Close</a>
				</div>
			</div>
			<!-- <div v-if="!showData && !allStudents"> -->
			<div v-if="">
				<h3 class="title no-data">No Student has applied yet!</h3>
			</div>
			<div class="allow" v-if="">
				<h3 class="title no-data">All Students moved to next Round</h3>
				<button class="button is-success">View Full-List</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'selection-round-offer',
  created() {
    console.log(this.$route.params);
  },
  data() {
    return {

    };
  },
  methods: {

  },
}
</script>

<style lang="scss">
.selection-round-offer {

}
</style>
