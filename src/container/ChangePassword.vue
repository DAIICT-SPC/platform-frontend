<template lang="html">
  <div class="change-password">
    <div class="container">
      <div class="box">
        <div class="header">
          <h3 class="title">Change Password</h3>
        </div>
        <div class="main-body">
          <div class="field">
            <p class="control">
              <input v-model="password" name="student_password" v-validate="'required|min:8'" type="password" placeholder="New Password" class="input">
            </p>
            <div v-show="errors.has('student_password')" class="help is-danger">
              The Password is required and should be greater than 8 characters.
            </div>
          </div>
          <div class="field">
            <p class="control">
              <input @keyup.enter="validateAndChangePassword" data-vv-as="password" class="input" name="confirm_student_password" v-validate="'required|confirmed:student_password'"
              type="password" placeholder="Re-Enter New Password">
            </p>
            <div v-show="errors.has('confirm_student_password')" class="help is-danger">
              The Confirm Password field is required and should match the Password field.
            </div>
          </div>
        </div>
        <div class="field reset-btn">
          <p>
            <button @click="validateAndChangePassword" name="company" class="button is-success submit-button">
              Reset
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import user from '@/api/user';
export default {
  name: 'change-password',
  beforeRouteEnter: (to, from, next) => {
    if (Auth.isAuthenticated()) {
      next({
        name: 'dashboard'
      });
    } else {
      next();
    }
  },
  created() {
    this.code = this.$route.params.code;
    this.verify();
  },
  data() {
    return {
      email: '',
      code: '',
      password: ''
    };
  },
  methods: {
    verify() {
      user.checkIfForgotPasswordCodeExists(this.code)
      .then((response) => {
        console.log(response);
        if (response.data.email) {
          this.email = response.data.email;
        }
        else {
          this.push404();
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    validateAndChangePassword() {
      this.validate()
      .then(() => {
        user.postChangePassword(this.password, this.code)
        .then((response) => {
          if(response.status == 200) {
            let toast = this.$toasted.success("Password Change Successful", {
              theme: "outline",
              position: "top-center",
              duration : 3000
            });
            this.pushHome();
          }
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      })
    },
    validate() {
      return this.$validator.validateAll();
    },
    push404() {
      this.$router.push({
        name: 'page-404'
      });
    },
    pushHome() {
      this.$router.push({
        name: 'home'
      });
    }
  },
}
</script>

<style lang="scss">
.change-password {
  .container {
    max-width: 600px;
    width: 100%;
    margin: auto;
  }

  .box {
    padding: 0;
  }

  margin: 2rem;
  .header {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }

  .main-body {
    padding: 1rem;
  }

  .reset-btn {
    border-top: solid 1px #ddd;
    padding: 1rem;
  }
}
</style>
