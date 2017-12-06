<template lang="html">
	<div class="add-selection-round-modal">
		<div class="open-for-modal">
			<div class="modal is-active">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Selection Round Details</p>
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
									<input v-validate="'required'" type="text" name="processName" placeholder="Process Name" class="input"
									v-model="placementDrive.ProcessName">
								</p>
								<div class="help is-danger" v-show="errors.has('processName')">
									The Process Name is a required field.
								</div>
							</div>

							<div class="field">
								<label class="label">Process Description</label>
								<p class="control">
									<textarea v-validate="'required'" name="processDescription" class="textarea" placeholder="Enter Process Discription"
									v-model="placementDrive.ProcessDescription"></textarea>
								</p>
								<div class="help is-danger" v-show="errors.has('processDescription')">
									The Process Description is a required field.
								</div>
							</div>

							<div class="date-time">
								<div class="field">
									<label class="label">Date Last</label>
									<p class="control is-fullwidth">
										<datepicker placeholder="Date" v-model="placementDrive.date"
										:config="{ dateFormat: 'Y-m-d H:i', enableTime: true, minDate:lastDateRegistration }">
										</datepicker>
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
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';
import Datepicker from 'vue-bulma-datepicker';

export default {
  name: 'add-selection-round-modal',

  props: [ 'lastDateRegistration' ],
  created() {
    this.placement_id = this.$route.params.placement_id;
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
      admin.getRoundNo( this.getUserId(), this.placement_id )
        .then( ( response ) => {
          console.log( "getRoundNo: ", response );
          if ( response.data == 'No Primary Details for this Placement!' ) {
            // this.$router.push({ name: 'placement-primary' });
          } else {
            this.round_no_this = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },

    selectionRounds() {
      // this.dateTime = this.placementDrive.date + " " + this.placementDrive.time + ':00';
      this.validate().then( () => {
          this.placementDrive.dateTime = this.placementDrive.date + ':00';
          admin.selectionRounds( this.getUserId(), this.placement_id,
              this.placementDrive.ProcessNo, this.placementDrive.ProcessName,
              this.placementDrive.ProcessDescription, this.placementDrive.dateTime )
            .then( ( response ) => {
              if ( response.data == 'Already DB has entry!' ) {
                // this.$router.push({ name: 'select-round-details', params:
                // { placement_id: this.placement_id } });
              } else if ( response.data == 'No Primary Details for this Placement!' ) {
                // this.$router.push({ name: 'placement-primary' });
              } else {
                let toast = this.$toasted.success( "Round Added", {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                } );
                // close the modal and refresh
                this.$bus.$emit( 'close-add-selection-round' );
                //clear the input boxes and start afresh
                // this.getRoundNo();
              }
            } )
            .catch( ( error ) => {
              console.log( error );
            } )
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },

    validate() {
      return this.$validator.validateAll();
    },
    getUserId() {
      return Auth.getUserToken();
    },

    close() {
      this.$bus.$emit( 'close-add-selection-round' );
    }
  },
  components: {
    Datepicker
  },
}
</script>

<style lang="scss">
.add-selection-round-modal {
    .date-time {
        display: flex;
        justify-content: flex-start;
        .field.time {
            padding-left: 1rem;
        }
    }
}
</style>
