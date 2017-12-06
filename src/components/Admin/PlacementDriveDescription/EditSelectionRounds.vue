<template lang="html">
  <div class="set-venue-date">
    <a @click="hidden=false" v-if="hidden">Edit Round Details</a>

    <div v-if="!hidden">

      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Venue</label>
            <p class="control">
              <input v-model="venue" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('venue') }" type="text" name="venue" placeholder="Enter Venue">
            </p>
          </div>
        </div>

        <div class="column">
          <div class="field">
            <label class="label">Date</label>
            <p class="control">
              <datepicker v-model="date" v-validate="'required'" placeholder="Select Date"
              :config="{ dateFormat: 'Y-m-d H:i', enableTime: true }" name="date" :class="{'input': true, 'is-danger': errors.has('date') }">
            </datepicker>
          </p>
        </div>
      </div>
    </div>

      <div class="field">
        <label class="label">Round Name</label>
        <p class="control">
          <input v-validate="'required'" v-model="round_name" type="text"
          class="input" name="round_name" placeholder="Name">
        </p>
        <div v-show="errors.has('round_name')" class="help is-danger">
          The Round Name is required.
        </div>
      </div>

      <div class="field">
        <label class="label">Round Description</label>
        <p class="control">
          <textarea v-validate="'required'" v-model="round_description"
            name="round_desc" class="textarea" placeholder="Job Description"></textarea>
        </p>
        <div v-show="errors.has('round_desc')" class="help is-danger">
          The Round Description is required.
        </div>
      </div>

      <div class="field register-button">
        <p class="has-text-centered">
          <a @click="validateAndEditRoundDetails">
            Submit
          </a>
        </p>
      </div>
  </div>

  <a @click="hidden=true" v-if="!hidden">Hide</a> <br>

</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';
import Datepicker from 'vue-bulma-datepicker';

export default {
  name: 'set-venue-date',
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.round_id = this.round.round_no;
    this.round_description = this.round.round_description;
    this.round_name = this.round.round_name;
  },

  props: {
    round: {
      required: true
    }
  },

  data() {
    return {
      placement_id: null,
      round_id: null,
      hidden: true,
      venue: '',
      date: '',
      time: '',
      round_name: '',
      round_description: ''
    }
  },

  methods: {
    validateAndEditRoundDetails() {
      this.time = this.date + ':00';
      this.venue, this.date, this.time
      admin.patchRoundDetailsDateVenue( this.getUserId(), this.placement_id, this.round_id, this.time,
          this.venue, this.date, this.time )
        .then( ( response ) => {
          if ( response.status == 200 ) {
            this.updateRoundDetails();
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },

    updateRoundDetails() {
      admin.patchRoundDetails( this.getUserId(), this.placement_id, this.round_id,
          this.round_name, this.round_description )
        .then( ( response ) => {
          let toast = this.$toasted.success( "Round Details Updated", {
            theme: "outline",
            position: "top-center",
            duration: 3000
          } );
          this.$bus.$emit( 'edit-selection-roundbox' );
          this.hidden = true;
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },

    getUserId() {
      return Auth.getUserToken();
    }
  },

  components: {
    Datepicker
  },
}
</script>

<style lang="scss">
.set-venue-date {
    .columns {
        padding: 0;
        margin: 0;
    }

    .last-time {
        width: 126px;
    }

    .register-button {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }

}
</style>
