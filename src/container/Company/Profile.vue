<template lang="html">
  <div class="myprofile-page">
      <div class="box company-profile">
        <div class="profile-head">
          <h2 class="title header">Overview</h2>
        </div>

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
              <p>Alternate Email</p>
            </div>
            <div class="field-body">
              <div>
                <p class="control ">
                  {{companyDetails.alternate_email}}
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

          <div class="field is-horizontal last">
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

        <EditCompanyProfileModal :companyDetails="companyDetails" v-if="showModal" @close="showModal = false"></EditCompanyProfileModal>

        <div class="profile-bottom">
          <button @click="showModal = true" class="button is-success edit-btn">Edit Details</button>
        </div>

      </div>

  </div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import EditCompanyProfileModal from '@/components/Company/EditCompanyProfileModal';

export default {
  name: 'myprofile-page',
  components: {
    EditCompanyProfileModal
  },

  data() {
    return {
      showModal: false,
      companyDetails: {}
    }
  },
  created() {
    this.$bus.$on('close-edit-modal', () => {
      this.showModal = false;
    })
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
.myprofile-page {
    padding: 2rem;

    .profile-head {
        border-bottom: solid 1px #ddd;
    }

    .company-profile {
        margin-top: 2rem;
        padding: 0;
        border-radius: 0.5rem;
        box-shadow: 0 4px 5px #d0cfcf;
        max-width: 1100px;
        width: 100%;
        margin: auto;
    }

    .title {
        padding: 1rem;
        margin: 0;

    }

    .form {
        padding: 1rem 1rem 0;
    }

    .field {
        border-bottom: solid 1px #ddd;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        .field-label {
            text-align: left;
            font-weight: bold;
        }
    }

    .field:last-child {
        border-bottom: none;
        margin: 0;
    }

    .edit-btn {
        margin: 0 1rem 1rem;
    }

    .profile-bottom {
        padding-top: 1rem;
        border-top: solid 1px #ddd;
    }
}
</style>
