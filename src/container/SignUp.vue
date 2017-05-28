<template>
  <div class="signup-page">
    <div class="container">
      <h1 class="title main">Welcome to the Student Placement Platform</h1>
      <div class="box">

        <div class="student-form" v-if="isStudent">
          <h2 class="title">Student Registration</h2>

          <div class="form-content">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Name</label>
                  <p class="control">
                    <input class="input" name="student_name" v-validate="'required|regex:^[A-Z][a-zA-Z ]*$|length:4'" type="text" placeholder="Name">
                  </p>
                  <div v-show="errors.has('student_name')" class="help is-danger">
                    The Student Name is required and.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <p class="control">
                    <input class="input" name="student_email" :value="email" v-validate="'required|email'" type="email" disabled placeholder="Email">
                  </p>
                  <div v-show="errors.has('student_email')" class="help is-danger">
                    {{ errors.first('student_email') }}
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Password</label>
                  <p class="control">
                    <input class="input" name="student_password" v-validate="'required|min:8'" type="password" placeholder="Password">
                  </p>
                  <div v-show="errors.has('student_password')" class="help is-danger">
                    The Password is required and should be greater than 8 characters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Confirm Password</label>
                  <p class="control">
                    <input class="input" name="confirm_student_password" v-validate="'required|min:8'" type="password" placeholder="Confirm Password">
                  </p>
                  <div v-show="errors.has('confirm_student_password')" class="help is-danger">
                    The Password is required and should match the Password field.
                  </div>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Contact No</label>
                  <p class="control">
                    <input class="input" name="contact_number" v-validate="'required|numeric|min:10|max:11'" type="number" placeholder="Contact No">
                  </p>
                  <div v-show="errors.has('contact_number')" class="help is-danger">
                    {{ errors.first('contact_number') }}
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Category</label>
                  <p class="control">
                    <span class="select is-fullwidth">
                      <select name="category" v-validate="'required'">
                        <option value="">Select dropdown</option>
                        <option>B.Tech</option>
                        <option>M.Tech</option>
                        <option>M.Des</option>
                        <option>MSc.IT</option>
                      </select>
                    </span>
                  </p>
                  <div v-show="errors.has('category')" class="help is-danger">
                    {{ errors.first('category') }}
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Temporary Address</label>
                  <p class="control">
                    <textarea name="temp_address" v-validate="'required'" class="textarea" placeholder="Temporary Address"></textarea>
                  </p>
                  <div v-show="errors.has('temp_address')" class="help is-danger">
                    {{ errors.first('temp_address') }}
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Permanent Address</label>
                  <p class="control">
                    <textarea class="textarea" name="perm_address" v-validate="'required'" placeholder="Permanent Address"></textarea>
                  </p>
                  <div v-show="errors.has('perm_address')" class="help is-danger">
                    {{ errors.first('perm_address') }}
                  </div>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Gender</label>
                  <p class="control">
                    <label class="radio">
                      <input type="radio" v-validate="'required'" name="gender" value="male">
                      Male
                    </label>
                    <label class="radio">
                      <input type="radio" v-validate="'required'" name="gender" value="female">
                      Female
                    </label>
                  </p>
                  <div v-show="errors.has('gender')" class="help is-danger">
                    {{ errors.first('gender') }}
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">DOB</label>
                  <p class="control">
                    <datepicker placeholder="Date of Birth" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today' }">
                    </datepicker>
                  </p>
                </div>
              </div>
            </div>


              <div class="field">
                <label class="label">Profile Picture</label>
                <p class="control">
                  <input class="input" name="student_profile" v-validate.reject="'mimes:image/*|size:2048'" type="file" placeholder="Please insert only the JPEG format picture">
                </p>
                <div v-show="errors.has('student_profile')" class="help is-danger">
                  {{ errors.first('student_profile') }}
                </div>
              </div>


            <p class="control">
              <input class="input" type="hidden" :value="code">
            </p>


            <div class="field">
              <p class="has-text-centered">
                <button class="button is-success submit-button">
                  Register
                </button>
              </p>
            </div>

          </div>
        </div>


        <div class="company" v-if="isCompany">
          <h2 class="title">Company Registration</h2>

          <div class="form-content">
            <div class="part-one">

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Name</label>
                    <p class="control">
                      <input class="input" name="user_name" v-validate="'required|alpha'" type="text" placeholder="Name">
                    </p>
                    <div class="help is-danger" v-show="errors.has('user_name')">
                      {{errors.first('user_name')}}
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Email</label>
                    <p class="control">
                      <input class="input" :value="email" name="user_email" v-validate="'required|email'" disabled type="email" placeholder="Email">
                    </p>
                    <div class="help is-danger" v-show="errors.has('user_email')">
                      {{errors.first('user_email')}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                      <input class="input" name="user_password" v-validate="'required|length:8|alpha_num'" type="password" placeholder="Password">
                    </p>
                    <div class="help is-danger" v-show="errors.has('user_password')">
                      {{errors.first('user_password')}}
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Confirm Password</label>
                    <p class="control">
                      <input class="input" name="confirm_user_password" v-validate="'required|min:8|alpha_num'" type="password" placeholder="Confirm Password">
                    </p>
                    <div class="help is-danger" v-show="errors.has('confirm_user_password')">
                      {{errors.first('confirm_user_password')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="part-two">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Company Name</label>
                    <p class="control">
                      <input class="input" name="company_name" v-validate="'required'" type="text" placeholder="Company Name">
                    </p>
                    <div class="help is-danger" v-show="errors.has('company_name')">
                      {{errors.first('company_name')}}
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Contact No</label>
                    <p class="control">
                      <input class="input" name="company_contact_number" v-validate="'required|min:10|max:11'" type="text" placeholder="Contact No">
                    </p>
                    <div class="help is-danger" v-show="errors.has('company_contact_number')">
                      {{errors.first('company_contact_number')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Company Address</label>
                  <p class="control">
                    <textarea class="textarea" name="company_address" v-validate="'required'" placeholder="Company Address"></textarea>
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_address')">
                    {{errors.first('company_address')}}
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Company Description</label>
                  <p class="control">
                    <textarea class="textarea" name="company_description" v-validate="'required'" placeholder="Company Description"></textarea>
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_description')">
                    {{errors.first('company_description')}}
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Company Url</label>
              <p class="control">
                <input class="input" name="company_url" v-validate="'required|url'" type="text" placeholder="Company Url">
              </p>
              <div class="help is-danger" v-show="errors.has('company_url')">
                {{errors.first('company_url')}}
              </div>
            </div>


            <p class="control">
              <input class="input" type="hidden" :value="code">
            </p>
            <div class="field">
              <p class="has-text-centered">
                <button class="button is-success submit-button">
                  Register
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activation from '@/stubs/activation'
import Datepicker from 'vue-bulma-datepicker'
import Auth from '@/packages/auth/Auth'


export default {
  name: 'signup',
  components: {
    'datepicker':Datepicker
  },
  // beforeRouteEnter (to, from, next) {
  //   // if user has registered once, do not access this page ever
  //   // if user has token, do not access this page
  //
  //   if (Auth.isAuthenticated()) {
  //     next({
  //       name: 'page-404'
  //     });
  //   } else {
  //     next();
  //   }
  // },
  data(){
    return {
      role: '',
      email: '',
      code: ''
    }
  },
  created(){
    this.fetchActivation();
  },
  computed: {
    isStudent(){
      return this.role === 'student';
    },
    isCompany(){
      return this.role === 'company';
    },
    activationCode(){
      return this.code=this.$route.params.code;
    }
  },
  methods: {
    fetchActivation(){
      this.role = activation[this.activationCode].role;
      this.email = activation[this.activationCode].email;
    }
  }
}
</script>

<style lang="scss">
.signup-page {
  margin: 2rem;
  .container {
    max-width: 700px;
    width: 100%;
    .title.main {
      border: 0;
      padding: 0;
      text-align: center;
    }
  }
  .box {
    padding: 0;
  }
  .title{
    border-bottom: solid 1px #ddd;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  .submit-button {
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 1rem;
  }
  .form-content {
    padding: 1rem;
  }
}
</style>
