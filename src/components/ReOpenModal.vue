<template>
	<div class="re-open">
		<!-- <button class="delete" @click="$emit('close')"></button> -->
		<div class="columns">

			<div class="column is-2 name-text">
				<label class="label">Set Date</label>
			</div>

			<div class="column is-3">
				<div class="field">
					<p class="control">
						<datepicker v-model="date" v-validate="'required'" placeholder="Select Date" :config="{ dateFormat: 'Y-m-d', static: true }" name="date"></datepicker>
					</p>
				</div>
			</div>

			<div class="column is-3">
				<div class="field">
					<p class="control">
						<input v-model="time" type="time" name="time" class="input" placeholder="Enter Date">
					</p>
				</div>
			</div>
			<div class="column">
				<!-- <button class="delete" @click="$emit('close')"></button> -->
				<div class="field register-button">
					<p class="has-text-centered">
						<button name="student" class="button is-success submit-button" @click="callReOpen">
							Register
						</button>
					</p>
				</div>
			</div>

		</div>


	</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
import Datepicker from 'vue-bulma-datepicker'
// import datetime from 'vue-datetimepicker'
export default{
	name:'re-open',
	created() {
		this.placement_id = this.$route.params.placement_id;
	},
	// reOpenRegistration(user_id, placement_id, last_data_for_registration)
	data() {
		return {
			date: '',
			time: '',
			dateTime: '',
			placement_id: null
		};
	},
	components: {
		Datepicker,
		// datetime
	},
	methods: {
		callReOpen() {
			this.dateTime = this.date + " " + this.time + ':00';
			admin.reOpenRegistration(this.getuserId(), this.placement_id, this.dateTime)
			.then((response) => {
				if(response.status == 200) {
					this.$bus.$emit('close_date_model');
				}
			})
			.catch((error) => {
				console.log(error);
			});
		},
		getuserId() {
			return Auth.getUserToken();
		}
	}
}
</script>

<style lang="scss">
.re-open {
	margin-bottom: 1rem;

	.column.is-2.name-text {
		text-align: right;
		padding-top: 1.2rem;
	}

	.field.register-button {
		.has-text-centered {
			text-align: left;
		}
	}
}
</style>
