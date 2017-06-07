<template>

	<div class="placement-drive">

		<h2 class="title placement-header">SELECTION ROUND DETAILS</h2>

		<div class="placement-body">
			<div class="field">
				<label class="label">Process No</label>
				<p class="control">
					<input disabled type="number" name="processNo" placeholder="Process No" class="input"
					v-model="placementDrive.ProcessNo = round_no_this">
				</p>
			</div>

			<div class="field">
				<label class="label">Process Name</label>
				<p class="control">
					<input v-validate="'required|alpha'" type="text" name="processName" placeholder="Process Name" class="input"
					v-model="placementDrive.ProcessName">
				</p>
				<div class="help is-danger" v-show="errors.has('processName')">{{ errors.first('processName') }}</div>
			</div>

			<div class="field">
				<label class="label">Process Description</label>
				<p class="control">
					<textarea v-validate="'required|alpha'" name="processDescription" class="textarea" placeholder="Enter Process Discription"
					v-model="placementDrive.ProcessDescription"></textarea>
				</p>
				<div class="help is-danger" v-show="errors.has('processDescription')">{{ errors.first('processDescription') }}</div>
			</div>

			<div class="field">
				<label class="label">Date</label>
				<p class="control is-fullwidth">
					<datepicker placeholder="Date" :config="{ dateFormat: 'Y-m-d', static: true }"
					v-model="placementDrive.date"></datepicker>
				</p>
			</div>

			<div class="field is-grouped">
				<p class="control">
					<button @click='selectionRounds' class="button is-primary">Save And New</button>
					<button @click="moveNext" class="button is-primary">Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import company from '@/api/company';
import Datepicker from 'vue-bulma-datepicker';

export default {
	name: 'placement-drive',
	components:{
		Datepicker
	},
	created() {
		if(this.$route.path == '/') {
			this.$router.push({name:'placement-primary'})
		}
		else {
			this.placement_id =  this.$route.params.placement_id;
			this.getRoundNo();
		}
	},
	data() {
		return {
			placement_id: null,
			round_no_this: null,
			placementDrive: {
				ProcessNo: null,
				ProcessName: '',
				ProcessDescription: '',
				date: ''
			}
		}
	},
	methods: {
		getRoundNo() {
			this.placementDrive.ProcessName = '';
			this.placementDrive.ProcessDescription = '';
			this.placementDrive.date = '';
			company.getRoundNo(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data == 'No Primary Details for this Placement!') {
					this.$router.push({ name: 'placement-primary' });
				}
				else {
					this.round_no_this = response.data;
				}
			})
			.catch((error) => {
				console.log(error);
			})
		},
		selectionRounds() {
			this.validate().then(() => {
				company.selectionRounds(this.getUserId(), this.placement_id,
				this.placementDrive.ProcessNo, this.placementDrive.ProcessName,
				this.placementDrive.ProcessDescription, this.placementDrive.date)
				.then((response) => {
					if(response.data == 'Already DB has entry!') {
						this.$router.push({ name: 'select-round-details', params:
						{
							placement_id: this.placement_id
						}
					})
				}
				else if(response.data == 'No Primary Details for this Placement!') {
					this.$router.push({ name: 'placement-primary' });
				}
				else {
					setTimeout(this.getRoundNo, 1);
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
	moveNext() {
		Auth.setCriteriaId(0);
		this.$router.push({ name: 'placement-criteria', params: { placement_id: this.placement_id } });
	},
	getUserId() {
		return Auth.getUserToken();
	},
	validate() {
		return this.$validator.validateAll();
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
