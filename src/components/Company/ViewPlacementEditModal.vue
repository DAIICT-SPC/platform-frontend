<template lang="html">
  <div class="company-placement-edit-modal">

    <div class="box">

      <div class="details">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Job Title</label>
              <p class="control">
                <input type="hidden" v-model="placement_id = placementDescription.placement_id"  />
                <input v-model="job_title = placementDescription.job_title" v-validate="'required'" class="input" type="text" name="job_title" placeholder="Job Title">
              </p>
              <div v-show="errors.has('job_title')" class="help is-danger">
                The Job Title is a required field.
              </div>
            </div>
            <div class="field">
              <label class="label">Location</label>
              <p class="control">
                <input v-model="location = placementDescription.location" v-validate="'required'" class="input" type="text" name="location" placeholder="Job Title">
              </p>
              <div v-show="errors.has('location')" class="help is-danger">
                The Job Location is a required field.
              </div>
            </div>

            <div class="field">
              <label class="label">Package</label>
              <p class="control">
                <input v-model="package = placementDescription.package" v-validate="'required'" class="input" type="text" name="package" placeholder="Package">
              </p>
              <div v-show="errors.has('package')" class="help is-danger">
                The Package is a required field.
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Job Description</label>
              <p class="control">
                <textarea v-model="job_description = placementDescription.job_description" v-validate="'required'" name="job_description" class="textarea" placeholder="Job Description"></textarea>
              </p>
              <div class="help is-danger" v-show="errors.has('job_description')">
                The Job Description is a required field.
              </div>
            </div>
            <div class="field">
              <label class="label">No. of Vacancies</label>
              <p class="control">
                <input v-model="no_of_students = placementDescription.no_of_students" v-validate="'required'" class="input" type="text" name="no_of_students" placeholder="No of Students">
              </p>
              <div v-show="errors.has('no_of_students')" class="help is-danger">
                The No of Students is a required field.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="update-btn">
        <a class="button is-success" @click="validateAndUpdate">Update</a>
      </div>

    </div>


  </div>
</template>

<script>
import Auth from '@/packages/auth/Auth'
import company from '@/api/company'

export default {
  name: 'company-placement-edit-modal',
  props: {
    placementDescription: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      job_title: '',
      job_description: '',
      location: '',
      placement_id: null,
      package: null,
      no_of_students: null,
    }
  },
  methods: {
      validateAndUpdate() {
        this.validate()
        .then(() => {
          //call update
          company.updatePlacementDriveDescription(this.getUserId(), this.placement_id,
          this.package, this.no_of_students,
          this.job_title, this.location, this.job_description)
          .then((response) => {
            if(response.status == 200) {
              let toast = this.$toasted.success("Details Updated", {
                theme: "outline",
                position: "top-center",
                duration : 3000
              });
              this.$bus.$emit('closeDescription');
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
.company-placement-edit-modal {

  margin-top: 1rem;

  .update-btn {
    padding-top: 0.5rem;
  }
}
</style>
