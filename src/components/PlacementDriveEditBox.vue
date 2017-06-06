<template lang="html">
  <div class="placement-round-detail">

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
import admin from '@/api/admin'

export default {
  name: 'placement-drive-box',
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
      placement_id: null
    }
  },
  methods: {
      validateAndUpdate() {
        this.validate()
        .then(() => {
          //call update
          admin.updatePlacementDriveDescription(this.getUserId(), this.placement_id, this.job_title, this.location, this.job_description)
          .then((response) => {
            if(response.status == 200) {
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
</style>
