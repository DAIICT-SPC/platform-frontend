<template lang="html">
  <div class="eligibility-criteria-box">
    <a class="button is-white" @click="hidden=false" v-if="hidden">Edit</a>
    <a class="button is-white" @click="hidden=true" v-if="!hidden">Hide</a>
    <div class="box" v-if="!hidden">

      <div class="columns">
        <div class="column" v-for="cr in criterias">
          <div class="field">
            <label class="label">{{cr.education.name}}</label>
            <p class="control">
              <input v-model="cr.cpi_required" v-validate="'required'" class="input" type="text" name="job_title" placeholder="Job Title">
            </p>
            <div v-show="errors.has('job_title')" class="help is-danger">
              The Job Title is a required field.
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'placement-drive-box',
  data() {
    return {
      hidden: true
    };
  },
  props: {
    criterias: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss">
.eligibility-criteria-box {

  .button.is-white {
    display: flex;
    justify-content: center;
  }

  .input {
    width: 170px;
  }

    .control {
      display: flex;
      justify-content: center;
      margin: auto;
      padding-bottom: 1rem;
    }

  .label {
    display: flex;
    justify-content: center;
  }
}

</style>
