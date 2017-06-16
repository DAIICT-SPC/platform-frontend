<template lang="html">
  <div class="set-venue-date">
    <a @click="hidden=false" v-if="hidden">Edit Venue & Date</a>
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
              :config="{ dateFormat: 'Y-m-d', static: true }" name="date" :class="{'input': true, 'is-danger': errors.has('date') }">
              </datepicker>
            </p>

          </div>
        </div>

        <div class="column last-time">
          <div class="field">
            <label class="label">Time</label>
            <p class="control">
              <input v-model="time" type="time" name="time" class="input" placeholder="Enter Time">
              <input type="hidden" v-model="round_id = round.id" />
            </p>

          </div>
        </div>

      </div>

      <div class="columns">
        <div class="column">

        </div>
        <div class="column">
          <div class="field register-button">
            <p class="has-text-centered">
              <a @click="validateAndEditRoundDetails" class="">
                Submit
              </a>
            </p>
          </div>
        </div>
        <div class="column">

        </div>
      </div>

    </div>

    <a @click="hidden=true" v-if="!hidden">Hide</a>

  </div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
import Datepicker from 'vue-bulma-datepicker'

export default {
  name: 'set-venue-date',
  created() {
    this.placement_id = this.$route.params.placement_id;
  },
  components: {
    Datepicker
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
      dateTime: ''
    }
  },
  methods: {
    validateAndEditRoundDetails() {
      this.dateTime = this.date + " " + this.time + ':00';
      this.time = this.time + ':00';
      admin.postRoundDetails(this.getUserId(), this.placement_id, this.round_id, this.dateTime,
      this.venue, this.date, this.time)
      .then((response) => {
        if(response.status == 200) {
          this.hidden = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
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

}
</style>
