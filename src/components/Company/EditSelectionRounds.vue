<template>
  <div class="placement-round-detail">
    <a @click="hidden=false" v-if="hidden">Edit Info</a>
    <div class="box" v-if="!hidden">
      <!-- <p>
      Date &amp; Time: <b>{{round.date_of_round}}</b>
    </p>
    <p class="round-description">
    {{round.round_description}}
  </p> -->

  <div class="field">
    <label class="label">Round Name</label>
    <p class="control">
      <input class="input" name="student_name" v-validate="'required|alpha_spaces'"
      type="text" placeholder="Name" v-model="round_name = round.round_name">
    </p>
    <div v-show="errors.has('student_name')" class="help is-danger">
      The Student Name is required and should contain only letters.
    </div>
  </div>

  <div class="field">
    <label class="label">Round Description</label>
    <p class="control">
      <textarea name="temp_address" v-validate="'required'"
      class="textarea" placeholder="Temporary Address" v-model="round_description = round.round_description"></textarea>
    </p>
    <div v-show="errors.has('student_name')" class="help is-danger">
      The Student Name is required and should contain only letters.
    </div>
  </div>

  <div class="field register-button">
    <p class="has-text-centered">
      <a name="student" class="submit-button" @click="updateRoundDetails">
        Submit
      </a>
      <pre>{{$data}}</pre>
    </p>
  </div>


</div>
<a @click="hidden=true" v-if="!hidden">Hide Info</a>
<br />
<a class="is-danger" @click="deleteSelectionRound">Delete</a>

</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'admin-edit-modal',
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.round_no = this.round.round_no;
  },
  data() {
    return {
      hidden: true,
      round_name: '',
      round_description: '',
      round_no: null,
      placement_id: null
    };
  },
  methods: {
    updateRoundDetails() {
      company.patchRoundDetails(this.getUserId(), this.placement_id, this.round_no,
      this.round_name, this.round_description)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deleteSelectionRound() {
      company.deleteSelectionRound(this.getUserId(), this.placement_id, this.round_no)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  },

}
</script>
<style lang="scss">
.placement-round-detail {
  .box {
    margin-top: 10px;
    padding: 0.5rem;

    .round-description {
      // margin-top: 10px;
      padding: 1rem;
    }
  }
}
</style>
