<template lang="html">
  <div class="offer-modal">

    <a class="button is-primary is-outlined" @click="isFeedbackGiven" v-if="!hidden">Give Offer</a>

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
    <feedback-modal v-if="feedbackModal" @close="feedbackModal = false"></feedback-modal>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import company from '@/api/company';
import FeedBackModal from '@/components/Company/FeedBackModal';

export default {
  name: 'offer-modal',
  components: {
    'feedback-modal': FeedBackModal
  },
  props: {
    studentData: {
      required: true
    }
  },
  data() {
    return {
      palcement_id: null,
      hidden: false,
      packageOffer: null,
      feedbackModal: false
    };
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.$bus.$on('feedback-done', () => {
      // refresh
      this.feedbackModal = false;
      this.isFeedbackGiven();
    })
  },
  methods: {
    isFeedbackGiven() {
      company.isFeedbackGiven(this.getUserId(), this.placement_id)
      .then((response) => {
        if(response.data == true) {
          this.hidden = true;
        }
        else {
          let toast = this.$toasted.show("Request you to please kindly give Feedback first.", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          // open feedback Modal
          this.feedbackModal = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    giveOffer() {
      company.postGiveOffer(this.getUserId(), this.placement_id, this.studentData.enroll_no, this.packageOffer)
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
      company.getStudentsForOffer(this.getuserId(), this.placement_id)
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
