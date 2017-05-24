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
            <span class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>

            <div class="nav-right nav-menu">
              <span class="nav-item">



                <!-- input fields -->
                <div class="field" id="field-input-signin">
                  <p class="control has-icons-left" id="input-control">
                    <input v-model="email" name="email" v-validate="'required|email'" class="input is-small" type="text" placeholder="Email">
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <div v-show="errors.has('email')">
                      {{ errors.first('email') }}
                    </div>
                  </p>

                </div>
                <div class="field" id="field-input-signin">
                  <p class="control has-icons-left" id="input-control">
                    <input v-model="password" name="password" v-validate="'required|min:6'" class="input is-small" type="text" placeholder="Password">
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                    <div v-show="errors.has('password')">
                      {{ errors.first('password') }}
                    </div>
                  </p>
                </div>
                <div>
                  <input class="button is-info is-outlined is-inverted" type="submit" value="Login" @click="login" />
                </div>
                <!-- </router-link> -->

              </span>
            </div>
          </div>
        </header>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="columns is-mobile">
            <div class="column is-6 is-offset-3">
              <p>
                <img src="../../images/daiict1.png" id="imgdaSignin" />
              </p>
              <h1 class="title is-2">
                Student Placement Cell
              </h1>
            </div>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  // before coming to '/'' or home or signin page, if u have a token, go to dashboard page
  beforeRouteEnter: (to, from, next) => {
    if (window.localStorage.getItem('token') != null) {
      next({
        name: 'dashboard'
      });
    } else {
      next();
    }
  },
  methods: {
    login() {
      this.validate().then(this.fetchUser().then(this.storeUser).then(this.redirect));
    },
    validate() {
      return this.$validator.validateAll();
    },
    fetchUser() {
      return new Promise((resolve, reject) => {
        // Make axios request
        let user = {
          id: 1,
          name: "Kunal Varma"
        };

        let token = "abcd123456789";
        resolve({
          token: token,
          user: user
        });
      });
    },
    storeUser: (tokenUser) => {
      let userStr = JSON.stringify(tokenUser.user);

      window.localStorage.setItem('token', tokenUser.token);
      window.localStorage.setItem('user', userStr);
    },
    redirect() {
      this.$router.push({
        name: 'dashboard'
      });

    }
  }
}
</script>

<style lang="css">
.hero.is-dark{
  background-image: linear-gradient(rgba(25, 181, 254, 0.6),rgba(246, 36, 89, 0.3)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.1))
}

.hero-body{
  padding-top: 0px;
}

.container.has-text-centered{
  bottom: 70px;
}

.column.is-6{
  -webkit-border-radius: 1em;
  outline: grey;
  outline-width:  medium;
  outline-offset: 0px, glow;
  outline-color: grey;
  outline-style: double;
  padding-top: 20px;
  padding-bottom: 20px;
}

#imgdaSignin{
  width: 30%;
}

#field-input-signin{
  margin-bottom: 0px;
  padding-right: 10px;
}

#input-control{
  opacity: 0.7;
}

.fa{
  padding-left: 27px;
}
</style>
