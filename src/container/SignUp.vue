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
                    <input v-model="student.name" class="input" name="student_name" v-validate="'required|alpha_spaces'" type="text" placeholder="Name">
                  </p>
                  <div v-show="errors.has('student_name')" class="help is-danger">
                    The Student Name is required and should contain only letters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <p class="control">
                    <input v-model="email" class="input" name="student_email" :value="email" v-validate="'required|email'" type="email" disabled placeholder="Email">
                  </p>
                  <div v-show="errors.has('student_email')" class="help is-danger">
                    The Student Email is required and should be a valid Email address.
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Password</label>
                  <p class="control">
                    <input v-model="student.password" name="student_password" v-validate="'required|min:8|alpha_dash'" type="password" placeholder="Password" class="input">
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
                    <input data-vv-as="password" class="input" name="confirm_student_password" v-validate="'required|confirmed:student_password'" type="password" placeholder="Confirm Password">
                  </p>
                  <div v-show="errors.has('confirm_student_password')" class="help is-danger">
                    The Confirm Password field is required and should match the Password field.
                  </div>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Contact No</label>
                  <p class="control">
                    <input v-model="student.contact" class="input" name="contact_number" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No">
                  </p>
                  <div v-show="errors.has('contact_number')" class="help is-danger">
                    The Contact Number field is required and should contain at least 8 numeric values.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Category</label>
                  <p class="control">
                    <category-dropdown></category-dropdown>
                  </p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Temporary Address</label>
                  <p class="control">
                    <textarea v-model="student.temporaryAddress" name="temp_address" v-validate="'required'" class="textarea" placeholder="Temporary Address"></textarea>
                  </p>
                  <div v-show="errors.has('temp_address')" class="help is-danger">
                    The Temporary Address is a required field with minimum of 10 letters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Permanent Address</label>
                  <p class="control">
                    <textarea v-model="student.permanentAddress" class="textarea" name="perm_address" v-validate="'required'" placeholder="Permanent Address"></textarea>
                  </p>
                  <div v-show="errors.has('perm_address')" class="help is-danger">
                    The Permanent Address is a required field with minimum of 10 letters.
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
                      <input v-model="student.gender" type="radio" v-validate="'required'" name="gender" value="Male">
                      Male
                    </label>
                    <label class="radio">
                      <input v-model="student.gender" type="radio" name="gender" value="Female">
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
                    <!-- <input type="date" name="student_dob" value=""> -->
                    <datepicker v-validate="'required'" v-model="student.dob" name="student_dob" placeholder="Date of Birth" :config="{ dateFormat: 'Y-m-d', wrap: true, maxDate: 'today', static: true }">
                    </datepicker>
                  </p>
                  <div v-show="errors.has('student_dob')" class="help is-danger">
                    {{ errors.first('student_dob') }}
                  </div>
                </div>
              </div>
            </div>

            <!-- <p class="control">
            <input class="input" type="hidden" :value="code">
          </p> -->

          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Enrollnment no</label>
                <p class="control">
                  <input v-model.number="student.enroll_no" class="input" name="student_enroll_no" v-validate="'required|numeric'" type="text" placeholder="Enrollnment Number">
                </p>
                <div v-show="errors.has('student_enroll_no')" class="help is-danger">
                  The Student Enrollnment Number is required and should be of 9 digits.
                </div>
              </div>
            </div>
            <div class="column">
            </div>
          </div>
        </div>
        <div class="field register-button">
          <p class="has-text-centered">
            <button name="student" class="button is-success submit-button" @click="registerAndValidate('student')">
              Register
            </button>
          </p>
        </div>



      </div>


      <div class="company" v-if="isCompany">
        <h2 class="title">Company Registration</h2>

        <div class="form-content">
          <div class="part-one">

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Contact Person Name</label>
                  <p class="control">
                    <input v-model="company.user_name" name="user_name" v-validate="'required|alpha_spaces'" type="text" placeholder="Name" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('user_name')">
                    The Name is required and should contain only letters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <p class="control">
                    <input v-model="this.email" :value="email" name="user_email" v-validate="'required|email'" disabled type="email" placeholder="Email" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('user_email')">
                    The Email is required and should be a valid Email address.
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Password</label>
                  <p class="control">
                    <input v-model="company.password" name="user_password" v-validate="'required|min:8|alpha_dash'" type="password" placeholder="Password" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('user_password')">
                    The Password is required and should be greater than 8 characters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Confirm Password</label>
                  <p class="control">
                    <input name="confirm_user_password" v-validate="'required|confirmed:user_password'" type="password" placeholder="Confirm Password" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('confirm_user_password')">
                    The Confirm Password field is required and should match the Password field.
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
                    <input v-model="company.companyName" name="company_name" v-validate="'required|alpha_spaces'" type="text" placeholder="Company Name" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_name')">
                    The Company Name is required and should contain only letters.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Contact No</label>
                  <p class="control">
                    <input v-model="company.contact" name="company_contact_number" v-validate="'required|numeric|min:8'" type="number" placeholder="Contact No" class="input">
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_contact_number')">
                    The Contact Number field is required and should contain at least 8 numeric values.
                  </div>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Company Address</label>
                  <p class="control">
                    <textarea v-model="company.companyAddress" name="company_address" v-validate="'required|min:10'" placeholder="Company Address" class="textarea"></textarea>
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_address')">
                    The Company Address is required.
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Company Description</label>
                  <p class="control">
                    <textarea v-model="company.companyDescription" name="company_description" v-validate="'required|min:10'" placeholder="Company Description" class="textarea"></textarea>
                  </p>
                  <div class="help is-danger" v-show="errors.has('company_description')">
                    The Company Description is required.
                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Company Url</label>
              <p class="control">
                <input v-model="company.companyURL" name="company_url" v-validate="'required|url'" type="text" placeholder="Company URL" class="input">
              </p>
              <div class="help is-danger" v-show="errors.has('company_url')">
                The Company URL is required and should be a valid URL.
              </div>
            </div>
          </div>


          <p class="control">
            <input class="input" type="hidden" :value="code">
          </p>

          <div class="field">
            <p class="has-text-centered">
              <button name="company" class="button is-success submit-button" @click="registerAndValidate('company')">
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
import activation from '@/api/activation'
import Datepicker from 'vue-bulma-datepicker'
import Auth from '@/packages/auth/Auth'
import CategoryDropdown from '@/components/CategoryDropdown'
import user from '@/api/user'
import jwtDecode from 'jwt-decode'

export default {
  name: 'signup',
  components: {
    Datepicker,
    CategoryDropdown
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
  data() {
    return {
      role: '',
      email: '',
      code: '',
      student: {
        name: '',
        password: '',
        enroll_no: null,
        contact: null,
        category: null,
        temporaryAddress: '',
        permanentAddress: '',
        gender: '',
        dob: ''
      },
      company: {
        user_name: '',
        password: '',
        companyName: '',
        contact: null,
        companyAddress: '',
        companyDescription: '',
        companyURL: ''
      }
    }
  },
  created() {

    this.$bus.$on('category-change', (category) => {
      this.student.category = category.id;
    });


    this.fetchActivation();
  },
  computed: {
    isStudent() {
      return this.role === 'student';
    },
    isCompany() {
      return this.role === 'company';
    },
    activationCode() {
      return this.code = this.$route.params.code;
    }
  },
  methods: {
    push404(email){
      if(this.email != null){
        console.log(this.role + ' Registration');
      }
      else {
        this.$router.push({
          name: 'page-404'
        });
      }
    },
    fetchActivation() {
      activation.getByCode(this.activationCode).then((response) => {
        this.email = response.data.email;
        this.role = response.data.role;
        this.push404(this.email);
      });
    },
    registerAndValidate(str) {
      this.checkUserValidation(str);
    },
    checkUserValidation(str) {
      if (str === 'student') {
        this.validateStudent().then(() => {
          user.registerStudent(this.student.name, this.student.password,
            this.code, this.student.enroll_no, this.student.category, this.student.temporaryAddress,
            this.student.permanentAddress, this.student.gender, this.student.dob)
            .then((response) => {
              if(response.status == 200) {
                alert('User Registration Successful');
                // this.$router.push({
                //   name: 'home'
                // });
                user.login(this.email, this.student.password)
                .then(this.storeToken)
                .catch((error) => {
                  console.log(error);
                })
                .then(this.redirect);
              }

            })
            .catch((error) => {
              console.log(error)
            })
            // this.$router.push({ name:'dashboard' });
          }).catch((error) => {
            console.log(error)
          })
        } else if (str === 'company') {
          this.validateCompany().then(() => {
            user.registerCompany(this.company.user_name, this.email,
              this.company.password, this.company.companyName, this.company.companyAddress,
              this.company.contact, this.company.companyDescription, this.company.companyURL,
              this.code)
              .then((response) => { alert('Company Registration Successful');
              this.$router.push({
                name: 'home'
              });
            })
            .catch((error) => {
              console.log(error)
            })
          }).catch(() => {
            console.log(error)
          })
        }
      },
      validateStudent() {
        return this.$validator.validateAll();
      },
      validateCompany() {
        return this.$validator.validateAll();
      },
      storeToken: (response) => {
        this.decodedToken = jwtDecode(response.data.token)
        Auth.setUserToken(this.decodedToken.sub)
        Auth.setToken(response.data.token)
      },
      redirect() {
        this.$router.push({
          name: 'education-first'
        });
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
    .title {
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
      .student-name {
        text-transform: capitalize;
      }
    }

    .field.register-button {
      border-top: solid 1px #ddd;
      padding-bottom: 1rem;
    }
  }
  </style>
