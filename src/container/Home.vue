<template lang="html">
  <div class="body">
    <section class="hero is-fullheight is-dark">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item">
                DA-IICT
              </a>
            </div>


            <div class="nav-right nav-menu">
              <form @submit.prevent="login" class="nav-item">
                <!-- input fields -->
                <div class="field">
                  <p class="control has-icons-left">
                    <input v-model="email" name="email" v-validate="'required|email'" class="input is-small" type="text" placeholder="Email">
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>

                  </p>
                </div>

                <div class="field">
                  <p class="control has-icons-left">
                    <input v-model="password" name="password" v-validate="'required'" class="input is-small" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>

                  </p>
                </div>
                <div>
                  <input class="button is-info is-outlined is-inverted" type="submit" value="Login" />
                </div>
                <!-- </router-link> -->

              </form>
            </div>
          </div>
        </header>
      </div>



      <div class="notification is-danger" v-show="errors.has('email')">
        {{ errors.first('email') }}
      </div>
      <div class="notification is-danger" v-show="errors.has('password')">
        {{ errors.first('password') }}
      </div>
    </section>

  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import user from '@/api/user'
import jwtDecode from 'jwt-decode'

export default {
  name: 'home',
  data() {
    return {
      email: '',
      password: '',
      decodedToken: ''
    }
  },
  // before coming to '/'' or home or signin page, if u have a token, go to dashboard page
  beforeRouteEnter: (to, from, next) => {
    if (Auth.isAuthenticated()) {
      next({
        name: 'dashboard'
      });
    } else {
      next();
    }
  },

  methods: {
    login() {
      this.validate()
      .then(this.loginUser)
      .catch(() => {
        console.log("Error");
      });
    },
    validate() {
      return this.$validator.validateAll();
    },
    loginUser() {
      user.login(this.email, this.password)
      .then(this.storeToken)
      .catch((error) => {
        console.log(error);
      })
      // .then(this.redirect);
    },

    storeToken: (response) => {
      this.decodedToken = jwtDecode(response.data.token)
      Auth.setUserToken(this.decodedToken.sub)
      Auth.setToken(response.data.token)
      user.getRole(this.decodedToken.sub)
      .then((response) => {
        if(response.data.role == 'student') {
          window.location.href='/dashboard';
        }
        else if(response.data.role == 'company') {
          window.location.href='/company';
        }
        else if(response.data.role == 'admin') {
          window.location.href='/admin';
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },

  }
}
</script>

<style lang="scss">
.body {

  .hero.is-dark {
    background-image: linear-gradient(rgba(25, 181, 254, 0.6),rgba(246, 36, 89, 0.3)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1));
  }

  .column.is-6 {
    -webkit-border-radius: 1em;
    outline: grey;
    outline-width: medium;
    outline-offset: 0px, glow;
    outline-color: grey;
    outline-style: double;
    padding-top: 20px;
    padding-bottom: 20px;
    .home-image {
      width: 30%;
    }
  }

  .field {
    margin-bottom: 0;
    padding-right: 10px;
    .control {
      opacity: 0.7;
    }
  }
  .hero {
    .notification.is-danger {
      display: table;
      //content accordingly
      margin-bottom: 0;
      margin-right: 0;
      margin-left: auto;
      background-color: #b31d1d;
    }
  }
}
</style>
