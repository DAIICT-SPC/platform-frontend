<template>
<div class="reason-modal">

  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Reason for Login</p>
      </header>
      <section class="modal-card-body">

        <p class="control ">
          <textarea v-model="reason" v-validate="'required'" type="text" name="reason" class="textarea" placeholder="Reason for Login">
									</textarea>
        </p>
        <div class="help is-danger" v-show="errors.has('reason')">
          The Reason cannot be Empty.
        </div>

      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="validateAndSubmitReason">Save and Login</a>
      </footer>
    </div>
  </div>

</div>
</template>

<script>
import user from '@/api/user';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'reason-modal',
  props: {
    email: {
      required: true
    },
    password: {
      required: true
    }
  },
  created() {},
  data() {
    return {
      reason: ''
    }
  },
  methods: {
    validateAndSubmitReason() {
      this.validate()
        .then((result) => {
					//true for validation success
					if(result) {
						// call api
						user.loginAdmin(this.email, this.password, this.reason)
						.then((response) => {
							// return token
							this.$bus.$emit('reason-modal', {
								response: response
							});
						})
						.catch((error) => {
							let toast = this.$toasted.error(error.response.data.message, {
								theme: "outline",
								position: "bottom-center",
								duration: 3000
							});
						})
					}
        })
        .catch((error) => {
          if(error.msg == "[vee-validate]: Validation Failed") {
						this.$toasted.error("Validation Failed!", {
							theme: "outline",
							position: "bottom-center",
							duration : 3000
						});
					}
					else {
						console.log(error);
					}
        })
    },

    validate() {
      return this.$validator.validateAll();
    }

  }
}
</script>

<style lang="scss">
.reason-modal {
    }
</style>
