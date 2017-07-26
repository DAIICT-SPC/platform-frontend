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
              :config="{ dateFormat: 'Y-m-d H:i', enableTime: true }" name="date" :class="{'input': true, 'is-danger': errors.has('date') }">
            </datepicker>
          </p>

        </div>
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
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
import Datepicker from 'vue-bulma-datepicker'

export default {
  name: 'set-venue-date',
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.round_id = this.round.round_no;
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
    }
  },
  methods: {
    validateAndEditRoundDetails() {
      this.time = this.date + ':00';
      this.venue, this.date, this.time
      admin.patchRoundDetails(this.getUserId(), this.placement_id, this.round_id, this.time,
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
    askDelete(id) {
      this.swal({
        // title: 'Are you sure?',
        text: "Delete the Category?",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#428aff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: true
      }).then(() => {
        this.deleteSelectionRound();
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

  .register-button {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

}
</style>
