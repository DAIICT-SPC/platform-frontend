<template lang="html">
  <div class="offer-modal">

    <a class="button is-primary is-outlined" @click="hidden=true" v-if="!hidden">Give Offer</a>

    <div class="box" v-if="hidden">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Offer Letter</p>
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
  created() {

  },
  methods: {
    giveOffer() {
      // console.log(this.getUserId()+"-"+ this.placement_id+"-"+ this.studentData.enroll_no+"-"+ this.packageOffer);
      admin.postGiveOffer(this.getUserId(), this.placement_id, this.studentData.enroll_no, this.packageOffer)
      .then((response) => {
        console.log(response);
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
  data() {
    return {
      hidden: false,
      packageOffer: null
    };
  },
}
</script>

<style lang="scss">
.offer-modal {

}
</style>
