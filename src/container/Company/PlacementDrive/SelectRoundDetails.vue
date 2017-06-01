<template>

	<div class="placement-drive">

		<h2 class="title placement-header">SELECTION ROUND DETAILS</h2>

		<div class="placement-body">
			<div class="field">
				<label class="label">Process No</label>
				<p class="control">
					<input v-validate="'required|number'" type="number" name="processNo" placeholder="Process No" class="input" v-model="placementDrive.ProcessNo">
				</p>
				<div class="help is-danger" v-show="errors.has('processNo')">{{ errors.first('processNo') }}</div>
			</div>

			<div class="field">
				<label class="label">Process Name</label>
				<p class="control">
					<input v-validate="'required|alpha'" type="text" name="processName" placeholder="Process Name" class="input" v-model="placementDrive.ProcessName">
				</p>
				<div class="help is-danger" v-show="errors.has('processName')">{{ errors.first('processName') }}</div>
			</div>

			<div class="field">
				<label class="label">Process Description</label>
				<p class="control">
					<textarea v-validate="'required|alpha'" name="processDescription" class="textarea" placeholder="Enter Process Discription" v-model="placementDrive.ProcessDescription"></textarea>
				</p>
				<div class="help is-danger" v-show="errors.has('processDescription')">{{ errors.first('processDescription') }}</div>
			</div>

			<div class="field">
				<label class="label">Date</label>
				<p class="control is-fullwidth">
					<datepicker placeholder="Date-Format yyyy-mm-dd" :config="{ dateFormat: 'Y-m-d', static: true }"
					v-model="placementDrive.Date"></datepicker>
				</p>
			</div>

			<div class="field is-grouped">
				<p class="control">
					<button class="button is-primary">Save And New</button>
					<button class="button is-primary">Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
export default {
	name: 'placement-drive',
	components:{
		Datepicker
	},
	data() {
		return {
			placementDrive: {
				ProcessNo: null,
				ProcessName: '',
				ProcessDescription: '',
				date: ''
			}
		}
	}
}
</script>

<style lang="scss">
.placement-drive {

	.title.placement-header {
		border-bottom: solid 1px #ddd;
		margin-bottom: 0;
		padding: 1rem;
	}

	.placement-body {
		padding: 1rem;
	}
}
</style>
