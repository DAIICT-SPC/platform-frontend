<template>
  <div class="signup-page">
    <div class="container">
      <div class="box">

        <div class="student-form" v-if="student">
          <h2 class="title">Student Registration</h2>

          <div class="form-content">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Name</label>
                  <p class="control">
                    <input class="input" type="text" placeholder="Name">
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Email</label>
                  <p class="control">
                    <input class="input" type="email" placeholder="Email">
                  </p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Password</label>
                  <p class="control">
                    <input class="input" type="password" placeholder="Password">
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Confirm Password</label>
                  <p class="control">
                    <input class="input" type="password" placeholder="Confirm Password">
                  </p>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Contact No</label>
                  <p class="control">
                    <input class="input" type="number" placeholder="Contact No">
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Category</label>
                  <p class="control">
                    <span class="select is-fullwidth">
                      <select>
                        <option>Select dropdown</option>
                        <option>B.Tech</option>
                        <option>M.Tech</option>
                        <option>M.Des</option>
                        <option>MSc.IT</option>
                      </select>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Temporary Address</label>
                  <p class="control">
                    <textarea class="textarea" placeholder="Temporary Address"></textarea>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Permanent Address</label>
                  <p class="control">
                    <textarea class="textarea" placeholder="Permanent Address"></textarea>
                  </p>
                </div>
              </div>
            </div>


            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Gender</label>
                  <p class="control">
                    <label class="radio">
                      <input type="radio" name="gender">
                      Male
                    </label>
                    <label class="radio">
                      <input type="radio" name="gender">
                      Female
                    </label>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">DOB</label>
                  <p class="control">
                    <input class="input" type="text" placeholder="DOB">
                  </p>
                </div>
              </div>
            </div>

            <p class="control">
              <input class="input" type="hidden" value="code">
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


        <div class="company" v-if="company">
          <h2 class="title">Company Registration</h2>

          <div class="form-content">
            <div class="part-one">

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Name</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="Name">
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Email</label>
                    <p class="control">
                      <input class="input" type="email" placeholder="Email">
                    </p>
                  </div>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                      <input class="input" type="password" placeholder="Password">
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Confirm Password</label>
                    <p class="control">
                      <input class="input" type="password" placeholder="Confirm Password">
                    </p>
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
                      <input class="input" type="text" placeholder="Company Name">
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Contact No</label>
                    <p class="control">
                      <input class="input" type="email" placeholder="Contact No">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label class="label">Company Address</label>
                  <p class="control">
                    <textarea class="textarea" placeholder="Company Address"></textarea>
                  </p>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label class="label">Company Description</label>
                  <p class="control">
                    <textarea class="textarea" placeholder="Company Description"></textarea>
                  </p>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Company Url</label>
              <p class="control">
                <input class="input" type="text" placeholder="Company Url">
              </p>
            </div>


            <p class="control">
              <input class="input" type="hidden" value="code">
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
    <pre>{{$data}}</pre>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data(){
    return {
      role: '',
      email: '',
      code: ''
    }
  },
  created(){
    if(this.$route.params != null){
      this.code = this.$route.params.code;
    }
  },
  methods: {
    fetchActivation(){
      
    }
  }
}
</script>

<style lang="scss">
.signup-page {
  .container {
    max-width: 700px;
    width: 100%;
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
  }
}
</style>
