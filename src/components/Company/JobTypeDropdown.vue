<template>
	<div>
		<span class="select is-fullwidth">
			<select v-validate="'required|not_in:null'" v-model="jobTypeId" @change="jobTypeChange()" name="jobType-select">
				<option value=null>Select Dropdown</option>
				<option v-for="jt in jobTypes" :value="jt.id">{{ jt.job_type }}</option>
			</select>
		</span>
		<div class="help is-danger" v-show="errors.has('jobType-select')">
			The Job Type is a required field.
		</div>
	</div>

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
