<template>
  <div class="placement-round-detail">
    <span class="button is-white" @click="hidden=false" v-if="hidden">Edit</span>
    <span class="button is-white hide-btn" @click="hidden=true" v-if="!hidden">Hide</span>
    <div class="box" v-if="!hidden">

      <div class="details">

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Education</label>
              <p class="control">
                <dropdown :ed_id="ed_id"></dropdown>
              </p>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">College/School</label>
              <p class="control">
                <input v-model="education.clg_school = userEd.clg_school" v-validate="'required'"  class="input" type="text" name="collegeSchool" placeholder="College/School">
              </p>
              <div class="help is-danger" v-show="errors.has('collegeSchool')">
                {{ errors.first('collegeSchool') }}
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Start Year</label>
              <p class="control">
                <datepicker v-model="education.start_year = userEd.start_year" v-validate="'required'"  name="start_year" placeholder="Start Year" :config="{ dateFormat: 'Y-m-d', wrap: true, static: true }">
                </datepicker>
              </p>
              <div class="help is-danger" v-show="errors.has('start_year')">
                {{ errors.first('start_year') }}
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">End Year</label>
              <p class="control">
                <datepicker v-model="education.end_year = userEd.end_year" v-validate="'required'"  name="end_year" placeholder="Start Year" :config="{ dateFormat: 'Y-m-d', wrap: true, static: true }">
                </datepicker>
              </p>
              <div class="help is-danger" v-show="errors.has('end_year')">
                {{ errors.first('end_year') }}
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">CPI</label>
              <p class="control">
                <input v-model="education.cpi = userEd.cpi" v-validate="'required'" class="input" type="number" name="cpi" placeholder="CPI">
              </p>
              <div class="help is-danger" v-show="errors.has('cpi')">
                {{ errors.first('cpi') }}
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Drive Link</label>
              <p class="control">
                <input v-model="education.drive_link = userEd.drive_link" v-validate="'required'" class="input" type="text" name="driveLink" placeholder="Enter Drive Link">
              </p>
              <div class="help is-danger" v-show="errors.has('driveLink')">
                {{ errors.first('driveLink') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="update-btn">
        <a class="button is-success" @click="validateAndUpdateEducation">Update</a>
      </div>

    </div>


  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'
import EducationDropDown from '@/components/EducationDropdown'
import user from '@/api/user'

export default {
  name: 'admin-edit-modal',
  components: {
    Datepicker,
    'dropdown': EducationDropDown
  },
  props: {
    userEd: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      hidden: true,
      ed_id: null,
      education: {
				education_id: null,
				clg_school: '',
				cpi: null,
				drive_link: '',
				start_year: '',
				enroll_no: null
			}
    };
  },
  created() {
    this.ed_id = this.userEd.education_id;
    this.education.education_id = this.userEd.education_id;
  },
  methods: {
		validateAndUpdateEducation() {
			this.validate().then(() => {
				user.updateUserEducation(this.getUserId(), this.education.education_id, this.education.clg_school,
					this.education.start_year, this.education.end_year, this.education.drive_link, this.education.cpi)
					.then((response) => {
						if(response.status == 200) {
							alert('Updated Successfully');
							this.hidden = true;
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
			getUserId() {
				return Auth.getUserToken();
			}
		}
}
</script>
<style lang="scss">
.placement-round-detail {

  .box {
    padding: 0;
  }
  .update-btn {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  .details {
    padding: 1rem;
    border-bottom: solid 1px #ddd;
  }
  .hide-btn {
    display: flex;
    justify-content: center;
  }
}
</style>
