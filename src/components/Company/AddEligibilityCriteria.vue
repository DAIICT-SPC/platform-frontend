<template lang="html">
  <div class="add-eligibility-criteria-box">
    <a @click="hidden = !hidden" class="button" v-if="hidden">Add</a>
    <!-- <a class="button is-white">Add</a>
    <a class="button is-white">Hide</a> -->

    <div class="modal is-active" v-if="!hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Criteria for {{categories.name}}</p>
          <button class="delete" @click="hidden = !hidden"></button>
        </header>
        <section class="modal-card-body">

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Education</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control" v-if="education">
                  <!-- {{education_id_rec}} -->
                  <input type="hidden" v-model="education_id_rec = education[0].id">
                  <edit-dropdown :education_id_rec="education_id_rec" :category_id="category_id"></edit-dropdown>
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal abt-input">
            <div class="field-label">
              <p>CPI</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  <input v-model="cpi_required" v-validate="'required|numeric'" type="number"
                  name="cpi_required" :class="{'input': true, 'is-danger': errors.has('cpi_required') }"
                  @keyup.enter="addCriteria">
                </p>

              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" @click="addCriteria">Save changes</a>
          <a class="button" v-on:click="hidden = !hidden">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import EditEducationDropdown from '@/components/Company/EditEducationDropdown';
export default {
  name: 'add-eligibility-criteria-box',
  components: {
    'edit-dropdown': EditEducationDropdown
  },
  data() {
    return {
      hidden: true,
      cpi_required: null,
      category_id: null,
      education_id_send: null,
      education_id_rec: null,
      education: {},
      hidden: true
    };
  },
  props: {
    categories: {
      required: true,
    }
  },
  created() {
    // console.log(this.categories.name);
    this.category_id = this.categories.id;
    this.placement_id = this.$route.params.placement_id;

    this.$bus.$on('education-change', (data) => {
      this.education_id_send = data.id;
    });

    this.getEducation();
  },
  methods: {
    getEducation() {
      company.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, this.category_id)
      .then((response) => {
        this.education = response.data;
        this.education_id_rec = response.data[0].id;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    addCriteria() {
      company.setPlacementCriteria(this.getUserId(), this.placement_id, this.education_id_send,
      this.category_id, this.cpi_required)
      .then((response) => {
        if(response.status == 200) {
          this.hidden = true;
          this.$bus.$emit('added-eligibility-criteria');
          let toast = this.$toasted.success("Criteria Added", {
            theme: "outline",
            position: "top-center",
            duration : 3000
          });
          this.$bus.$emit('add-eligibility-criteria');
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    updateCriteria(education_id, category_id, cpi_required) {
      company.patchUpdateEligibilityCriteria(this.getUserId(), this.placement_id, education_id, category_id, cpi_required)
      .then((response) => {
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
.add-eligibility-criteria-box {

  .box {
    margin-top: 0.1rem;
    margin-bottom: 0.5rem;
    margin-right: 1rem;
  }

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

  .abt-input {
    margin: 0;
  }

  .field.register-button {
    padding: 0;
  }

  .has-text-centered {
    width: 274px;
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
