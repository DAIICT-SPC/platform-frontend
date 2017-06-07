<template lang="html">
  <div class="eligibility-criteria-box">
    <a class="button is-white" @click="hidden=false" v-if="hidden">Edit</a>
    <a class="button is-white" @click="hidden=true" v-if="!hidden">Hide</a>
    <div class="box" v-if="!hidden">

      <div class="columns">
        <div class="column" v-for="cr in criterias">
          <div class="field">
            <label class="label">{{cr.education.name}}</label>
            <input type="hidden" v-model="education_id = cr.education_id">
            <input type="hidden" v-model="category_id = cr.category_id">

            <p class="control">
              <input v-on:keyup.enter="updateCriteria(cr.education_id, cr.category_id, cr.cpi_required)" v-model="cpi_required = cr.cpi_required" v-validate="'required|between:1,10'" class="input" type="text" name="job_title" placeholder="Job Title">
            </p>
            <div v-show="errors.has('job_title')" class="help is-danger">
              The Criteria is a required field and the value should be less than 10 CPI.
            </div>
          </div>
          <div class="field register-button">
            <p class="has-text-centered">
              <button @click="updateCriteria(cr.education_id, cr.category_id, cr.cpi_required)" name="student" class="button is-success submit-button">
                Submit
              </button>
            </p>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import company from '@/api/company'
import Auth from '@/packages/auth/Auth'
export default {
  name: 'placement-drive-box',
  data() {
    return {
      hidden: true,
      cpi_required: null,
      category_id: null,
      education_id: null
    };
  },
  props: {
    criterias: {
      required: true,
      type: Array
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
  },
  methods: {
    updateCriteria(education_id, category_id, cpi_required) {
      console.log(education_id + "-" + category_id + "-" + cpi_required);
      company.patchUpdateEligibilityCriteria(this.getUserId(), this.placement_id, education_id, category_id, cpi_required)
      .then((response) => {
        console.log(response.data);
        this.hidden = true;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
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

  .columns {
      margin-bottom: 0;
      .column {
        padding-bottom: 0
      }
  }

  .register-button {
    padding-bottom: 1rem;
  }

  .input {
    width: 170px;
    text-align: center;
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
