<template lang="html">
  <div class="login-page">

    <section class="hero is-fullheight is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-4 is-offset-4">
              <div class="box">
                <img class="image is-256x256" src="../../images/daiict.jpg" alt="DAIICT">
                <hr class=image-text>
                <h3 class="title">Student Placement Cell</h3>
                <hr class="text-body">
                <label class="label">Email</label>
                <p class="control">
                  <input :disabled="block" v-model="email" name="email" v-validate="'required|email'" class="input" type="text" placeholder="abc@example.ac.in">
                </p>
                <div class="notification is-danger" v-show="errors.has('email')">
                  <span>{{ errors.first('email') }}</span>
                </div>

                <label class="label">Password</label>
                <p class="control">
                  <input :disabled="block" @keyup.enter="login" v-validate="'required'" v-model="password" name="password"
                  class="input" type="password" placeholder="●●●●●●●">
                </p>
                <div class="notification is-danger" v-show="errors.has('password')">
                  <span>{{ errors.first('password') }}</span>
                </div>
                <hr>
                <p class="control">
                  <button @click="login" class="button is-primary">Login</button>
                  <a class="button npm ruforgot is-pulled-right" @click="forgotModal = true">
                    <small class="forgot">
                      Forgot Password
                    </small>
                  </a>
                </p>
                <ForgotPassword :email="email" v-if="forgotModal" @close="forgotModal = false"></ForgotPassword>
                <ReasonModal :email="email" :password="password" v-if="reasonModal"></ReasonModal>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import user from '@/api/user';
import jwtDecode from 'jwt-decode';
import ForgotPassword from '@/components/ForgotPasswordModal';
import ReasonModal from '@/components/ReasonModal';

export default {
  name: 'home',
  components: {
    ForgotPassword,
    ReasonModal
  },
  created() {
    this.$bus.$on('forgot-password-modal-close', () => {
      this.forgotModal = false;
    })
    this.$bus.$on('reason-modal', (response) => {
      this.reasonModal = false;
      this.storeToken(response.response);
    });
  },
  data() {
    return {
      email: '',
      password: '',
      decodedToken: '',
      forgotModal: false,
      block: false,
      reasonModal: false
    }
  },
  // before coming to '/'' or home or signin page, if u have a token, go to dashboard page
  beforeRouteEnter: (to, from, next) => {
    if (Auth.isAuthenticated() && Auth.isStudent()) {
      next({
        name: 'dashboard'
      });
    }
    else if (Auth.isAuthenticated() && Auth.isCompany()) {
      next({
        name: 'company-home'
      });
    }
    else if (Auth.isAuthenticated() && Auth.isAdmin()) {
      next({
        name: 'admin-home'
      });
    }
    else
    {
      next();
    }
  },

  methods: {
    //step 1. Login, validates and checks if the user is admin.
    login() {
      this.validate()
      .then(this.checkForAdmin)
      .catch(() => {
        console.log("Error");
      });
    },
    //step 2 validates
    validate() {
      return this.$validator.validateAll();
    },
    //step 3 checks for admin, if no, login. else blocks the email password textbox,
    // asks for reason modal
    checkForAdmin() {
      user.checkForAdmin(this.email, this.password)
      .then((response) => {
        // false, not an admin
        if(response.data.status == false) {
          this.loginUser();
        }
        // if admin
        else {
          //if true, then ask a reason (disable the boxes)
          this.block = true;
          this.reasonModal = true;
        }
      })
      .catch((error) => {
        if(error.response.status == 500) {
          let toast = this.$toasted.error(error.response.statusText + ". Please try after sometime.", {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else if(error.response.status == 404) {
          let toast = this.$toasted.error(error.response.data.message, {
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
    //step 4 normal user login
    loginUser() {
      user.login(this.email, this.password)
      .then(this.storeToken)

      .catch((error) => {
        if(error.response.status == 404) {
          console.log(error);
          let toast = this.$toasted.error(error.response.data.message, {
            theme: "outline",
            position: "bottom-center",
            duration : 3000
          });
        }
        else {
          console.log(error);
        }
      })
      .then(this.redirect);
    },
    // step 5 store the token and redirects acc to the role
    storeToken: (response) => {
      this.decodedToken = jwtDecode(response.data.token)
      Auth.setUserToken(this.decodedToken.sub)
      Auth.setToken(response.data.token)
      user.getRole(this.decodedToken.sub)
      .then((response) => {
        if(response.data.role == 'student') {
          Auth.setUserRole(response.data.role);
          window.location.href='/dashboard';
        }
        else if(response.data.role == 'company') {
          Auth.setUserRole(response.data.role);
          window.location.href='/company';
        }
        else if(response.data.role == 'admin') {
          Auth.setUserRole(response.data.role);
          window.location.href='/admin';
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },

    storeAdminToken(token) {

    },
  }
}
</script>

<style lang="scss">

.login-page {

  .image {
    padding-left: 2.4rem;
  }

  .hero.is-dark .title {
    color: #000000;
  }

  hr.image-text {
    margin-bottom: 0.5rem;
  }

  h3.title {
    margin-bottom: 0
  }

  hr.text-body {
    margin-top: 0.5rem;
  }

  .notification.is-danger {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: rgba(260,0,0,0.4);
    filter: alpha(opacity=80);
  }

  .control {
    .forgot {
      color: #000000;
    }
  }
}

//
// .body {
//
//   .hero.is-dark {
//     background-image: linear-gradient(rgba(25, 181, 254, 0.6),rgba(246, 36, 89, 0.3)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1));
//   }
//
//   .column.is-6 {
//     -webkit-border-radius: 1em;
//     outline: grey;
//     outline-width: medium;
//     outline-offset: 0px, glow;
//     outline-color: grey;
//     outline-style: double;
//     padding-top: 20px;
//     padding-bottom: 20px;
//     .home-image {
//       width: 30%;
//     }
//   }
//
//   .field {
//     margin-bottom: 0;
//     padding-right: 10px;
//     .control {
//       opacity: 0.7;
//     }
//   }
//
// }
</style>
