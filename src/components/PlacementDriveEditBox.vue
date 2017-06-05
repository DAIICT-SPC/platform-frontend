<template lang="html">
  <div class="placement-round-detail">

    <div class="box">

      <div class="details">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Job Title</label>
              <p class="control">
                <input v-model="job_title = placementDescription.job_title" v-validate="'required'" class="input" type="text" name="job_title" placeholder="Job Title">
              </p>
              <div v-show="errors.has('job_title')" class="help is-danger">
                The Job Title is a required field.
              </div>
            </div>
            <div class="field">
              <label class="label">Location</label>
              <p class="control">
                <input v-model="location = placementDescription.location" v-validate="'required'" class="input" type="text" name="job_title" placeholder="Job Title">
              </p>
              <div v-show="errors.has('job_title')" class="help is-danger">
                The Job Title is a required field.
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
        <a class="button is-success">Update</a>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'placement-drive-box',
  data() {
    return {
      job_title: '',
      job_description: '',
      location: ''
    }
  },
  props: {
    placementDescription: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss">
</style>
