<template lang="html">
	<div class="open-for-modal">
		<div class="open-for-modal">
			<div class="modal is-active">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Open For</p>
						<button class="delete" @click="close"></button>
					</header>
					<section class="modal-card-body">

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

							<div class="date-time">
								<div class="field">
									<label class="label">Date</label>
									<p class="control is-fullwidth">
										<datepicker placeholder="Date" :config="{ dateFormat: 'Y-m-d', static: true }"
										v-model="placementDrive.date"></datepicker>
									</p>
								</div>
								<div class="field time">
									<label class="label">Time</label>
									<p class="control">
										<input v-model="placementDrive.time" type="time" name="time" class="input" placeholder="Enter Date">
									</p>
								</div>
							</div>
						</div>

					</section>
					<footer class="modal-card-foot">
						<a class="button is-success" @click="selectionRounds">Submit</a>
						<a class="button" @click="close">Close</a>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import Datepicker from 'vue-bulma-datepicker';

export default {
	name: 'open-for-modal',
	components: {
		Datepicker
	},
	created() {
		this.placement_id =  this.$route.params.placement_id;
	},
	data() {
		return {
			placement_id: null,
			round_no_this: null,
			placementDrive: {
				ProcessNo: null,
				ProcessName: '',
				ProcessDescription: '',
				date: '',
				time: '',
				dateTime: ''
			}
		}
	},
	created() {
		this.placement_id = this.$route.params.placement_id;
		this.getRoundNo();
	},
	methods: {
		getRoundNo() {
			this.placementDrive.ProcessName = '';
			this.placementDrive.ProcessDescription = '';
			this.placementDrive.date = '';
			company.getRoundNo(this.getUserId(), this.placement_id)
			.then((response) => {
				if(response.data == 'No Primary Details for this Placement!') {
					// this.$router.push({ name: 'placement-primary' });
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
			// this.dateTime = this.placementDrive.date + " " + this.placementDrive.time + ':00';
			this.validate().then(() => {
				this.placementDrive.dateTime = this.placementDrive.date + " " + this.placementDrive.time + ':00';
				company.selectionRounds(this.getUserId(), this.placement_id,
				this.placementDrive.ProcessNo, this.placementDrive.ProcessName,
				this.placementDrive.ProcessDescription, this.placementDrive.dateTime)
				.then((response) => {
					if(response.data == 'Already DB has entry!') {
						// this.$router.push({ name: 'select-round-details', params:
						// { placement_id: this.placement_id } });
					}
					else if(response.data == 'No Primary Details for this Placement!') {
						// this.$router.push({ name: 'placement-primary' });
					}
					else {
						let toast = this.$toasted.success("Round Added", {
							theme: "outline",
							position: "top-center",
							duration : 3000
						});
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

		validate() {
			return this.$validator.validateAll();
		},
		getUserId() {
			return Auth.getUserToken();
		},

		close() {
			this.$bus.$emit('close-add-selection-round');
		}
	}
}

</script>

<style lang="scss">
.open-for-modal {

}
</style>
