<template>

	<span class="select is-fullwidth">
		<select v-model="jobTypeId" @change="jobTypeChange()" name="select">
			<option value=null>Select Dropdown</option>
			<option v-for="jt in jobTypes" :value="jt.id">{{ jt.job_type }}</option>
		</select>
	</span>

</template>

<script>
import jobType from '@/api/jobType'
export default{
	name: 'jobtype-component',
	data() {
		return {
			jobTypes: [],
			jobTypeId: null
		}
	},
	created() {
		jobType.all().then((response) => {
			this.jobTypes = response.data;
		})
	},
	methods: {
		jobTypeChange() {
			this.$bus.$emit('jobType', { id: this.jobTypeId });
		}
	}
}
</script>

<style lang="scss">

</style>
