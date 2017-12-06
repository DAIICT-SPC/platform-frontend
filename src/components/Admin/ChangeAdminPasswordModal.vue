<template>
<div class="edit-modal">

  <!-- modal starts -->
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Change Password</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">

        <div class="field is-horizontal abt-admin">
          <div class="field-label">
            <p>Password</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                <input v-model="password" v-validate="'required'" type="password" name="password" class="input" placeholder="●●●●●●●">
              </p>
              <div class="help is-danger" v-show="errors.has('password')">
                {{errors.first('password')}}
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal abt-admin">
          <div class="field-label">
            <p>Confirm</p>
          </div>
          <div class="field-body">
            <div>
              <p class="control ">
                <input v-model="confirm" v-validate="'required|confirmed:password'" type="password" name="confirm" class="input" placeholder="●●●●●●●">
              </p>
              <div class="help is-danger" v-show="errors.has('confirm')">
                {{errors.first('confirm')}}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="validateAndUpdateDetails">Update</a>
        <a class="button" v-on:click="$emit('close')">Cancel</a>
      </footer>
    </div>
  </div>
  <!-- modal ends -->

</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'edit-modal',
  data() {
    return {
      password: '',
      confirm: ''
    }
  },
  methods: {
    validateAndUpdateDetails() {
      this.validate().then( () => {
          admin.patchCompanyPassword( this.getUserId(), this.password )
            .then( ( response ) => {
              if ( response.status == 200 ) {
                this.$emit( 'close' );
                let toast = this.$toasted.success( "Password Updated", {
                  theme: "outline",
                  position: "bottom-center",
                  duration: 3000
                } );
              }
            } )
            .catch( ( error ) => {
              console.log( error )
            } )
        } )
        .catch( ( error ) => {
          console.log( error )
        } )
    },
    validate() {
      return this.$validator.validateAll();
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">

</style>
