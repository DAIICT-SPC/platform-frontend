<template lang="html">
  <div class="offer-modal">

    <a class="button is-primary is-outlined" @click="hidden=true" v-if="!hidden">Give Offer</a>

    <div class="box" v-if="hidden">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Offer Letter for {{studentData.user.name}} <small>({{studentData.enroll_no}})</small></p>
            <button class="delete" @click="hidden=false"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <label class="label">Package</label>
              <p class="control">
                <input v-model="packageOffer" v-validate="'required'" class="input" type="number" name="package" placeholder="Please Enter Package">
              </p>
              <div v-show="errors.has('package')" class="help is-danger">
                The Package is a required field.
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="field register-button">
              <p class="has-text-centered">
                <button @click="giveOffer" name="student" class="button is-success submit-button">
                  Submit
                </button>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default {
  name: 'offer-modal',
  props: {
    studentData: {
      required: true
    },
    placement_id: {
      required: true
    }
  },
  data() {
    return {
      hidden: false,
      packageOffer: null
    };
  },
  created() {
    // console.log(this.studentData.enroll_no);
  },
  methods: {
    giveOffer() {
      admin.postGiveOffer(this.getUserId(), this.placement_id, this.studentData.enroll_no, this.packageOffer)
      .then((response) => {
        if(response.status == 200) {
          let toast = this.$toasted.success(this.studentData.user.name + " has been given the Offer.", {
  					theme: "outline",
  					position: "top-center",
  					duration : 3000
  				});
          this.hidden = false;
          this.$bus.$emit('refresh');
        }
        else if(response.data == 'All Students in last round got offer')
        {
          showAllOffer = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getStudentsOffer() {
      admin.getStudentsForOffer(this.getuserId(), this.placement_id)
      .then((response) => {
        this.remainingStudents = response.data;
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
    }
  },
}
</script>

<style lang="scss">
.offer-modal {

}
</style>
