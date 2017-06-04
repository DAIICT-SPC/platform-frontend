<template lang="html">
  <div class="myprofile-page">
    <div class="container">
      <div class="box company-profile">
        <h2 class="title header">Overview</h2>

        <!-- form data starts -->
        <div class="form">

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Company Name</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.company_name }}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Address</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.address }}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Contact Person</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.name }}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Contact No</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.contact_no }}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Company Description</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.company_expertise }}
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <p>Company URL</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{ companyDetails.company_url }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- form data ends -->
        <!-- modal starts -->
        <modal :companyDetails="companyDetails" v-if="showModal" @close="showModal = false"></modal>
        <!-- modal ends -->

        <button @click="showModal = true" class="button is-success edit-btn">Edit Details</button>

      </div>
    </div>


  </div>
</template>

<script>
import CompanyModal from '@/components/EditCompanyProfileModal'
import Auth from '@/packages/auth/Auth'
import company from '@/api/company'

export default {
  name: 'myprofile-page',
  components: {
    'modal': CompanyModal
  },

  data(){
    return{
      showModal: false,
      companyDetails: { }
    }
  },
  created() {
    company.getUserDetails(this.getUserId()).then((response) => {
      this.companyDetails = response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
    })
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.myprofile-page
{
  .container{
    padding: 2rem;
  }

  .company-profile{
    margin-top: 2rem;
    padding: 0;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 5px #d0cfcf;
    max-width: 1100px;
    width: 100%;
    margin: auto;
  }

  .title{
    padding: 1rem;
    margin: 0;

  }

  .form {
    padding: 1rem;
  }

  .field
  {
    border-bottom: solid 1px #ddd;
    margin-bottom: 1rem;
    padding-bottom: 1rem;

    .field-label
    {
      text-align: left;
      font-weight: bold;
    }
  }

  .edit-btn{
    margin: 1rem;
  }
}
</style>
