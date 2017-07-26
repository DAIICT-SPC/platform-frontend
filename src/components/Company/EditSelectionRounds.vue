<template>
  <div class="placement-round-detail">
    <a @click="hidden=false" v-if="hidden">Edit Info</a>
    <div class="box" v-if="!hidden">

      <div class="field">
        <label class="label">Round Name</label>
        <p class="control">
          <input class="input" name="round_name" v-validate="'required'"
          type="text" placeholder="Name" v-model="round_name = round.round_name">
        </p>
        <div v-show="errors.has('round_name')" class="help is-danger">
          The Round Name is required.
        </div>
      </div>

      <div class="field">
        <label class="label">Round Description</label>
        <p class="control">
          <textarea name="round_desc" v-validate="'required'"
          class="textarea" placeholder="Temporary Address" v-model="round_description = round.round_description"></textarea>
        </p>
        <div v-show="errors.has('round_desc')" class="help is-danger">
          The Round Description is required.
        </div>
      </div>

      <div class="field register-button">
        <p class="has-text-centered">
          <a name="student" class="submit-button" @click="updateRoundDetails">
            Submit
          </a>
        </p>
      </div>


    </div>
    <a @click="hidden=true" v-if="!hidden">Hide Info</a>
    <br />
    <a class="is-danger" @click="askDeleteSelectionRound">Delete</a>

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
    askDeleteSelectionRound() {
      this.swal({
        // title: 'Are you sure?',
        text: "Delete the Round?",
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
    updateRoundDetails() {
      company.patchRoundDetails(this.getUserId(), this.placement_id, this.round_no,
      this.round_name, this.round_description)
      .then((response) => {
        //toast confirmation and close
        let toast = this.$toasted.success("Round Details Updated", {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
        this.$bus.$emit('edit-selection-roundbox');
        this.hidden = true;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    deleteSelectionRound() {
      company.deleteSelectionRound(this.getUserId(), this.placement_id, this.round_no)
      .then((response) => {
        //toast confirmation and close
        let toast = this.$toasted.error("Round Deleted", {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
        this.$bus.$emit('edit-selection-roundbox');
        this.hidden = true;
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
