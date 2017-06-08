<template lang="html">
  <div class="eligibility-criteria-box">
    <a class="button is-white" @click="hidden=false" v-if="hidden">Add</a>
    <a class="button is-white" @click="hidden=true" v-if="!hidden">Hide</a>
    <div class="box" v-if="!hidden">

      <div class="field is-horizontal abt-admin">
        <div class="field-label">
          <p>Education</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control">
              <input type="hidden" v-model="ed_id=education[0].id">
              <edit-dropdown :ed_id="ed_id" :category_id="category_id"></edit-dropdown>
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal abt-admin">
        <div class="field-label">
          <p>CPI</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              <input v-model="cpi_required" v-validate="'required|numeric'" type="number"
              name="cpi_required" class="input">
            </p>
            <div class="help is-danger" v-show="errors.has('cpi_required')">
              CPI is a required field.
            </div>
          </div>
        </div>
      </div>

      <a class="button is-success" @click="addCriteria">Submit</a>


    </div>
  </div>
</template>

<script>
import company from '@/api/company'
import Auth from '@/packages/auth/Auth'
import EditEducationDropdown from '@/components/Company/EditEducationDropdown'
export default {
  name: 'placement-drive-box',
  components: {
    'edit-dropdown': EditEducationDropdown
  },
  data() {
    return {
      hidden: true,
      cpi_required: null,
      category_id: null,
      education_id: null
    };
  },
  props: {
    category_id: {
      required: true,
    }
  },
  beforeUpdate() {
    this.$bus.$on('education-change', (data) => {
      this.education_id = data.id;
    });
  },
  created() {
    console.log("received" + this.category_id);
    this.placement_id = this.$route.params.placement_id;

			company.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, this.category_id)
			.then((response) => {
				this.education = response.data;
				this.ed_id = this.education[0].id;
			})
			.catch((error) => {
				console.log(error);
			})
  },
  methods: {
    addCriteria() {
      console.log(this.placement_id+"-"+ this.education_id+"-"+ this.category_id+"-"+ this.cpi_required);
      company.setPlacementCriteria(this.getUserId(), this.placement_id, this.education_id,
      this.category_id, this.cpi_required)
      .then((response) => {
        if(response.status == 200) {
          // $emit('close');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
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
    deleteCriteria(education_id, category_id, cpi_required) {

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
