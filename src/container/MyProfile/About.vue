<template lang="html">
  <div class="student-about-tab">
    <h2 class="title">Overview</h2>

    <div class="form">
      <div class="field is-horizontal">
        <div class="field-label">
          <p>Student Id</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{ userMainDetails.enroll_no }}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Name</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{ userMainDetails.name }}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal" v-if="userMainDetails.category">
        <div class="field-label">
          <p>Programe Name</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{ userMainDetails.category.name }}
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
              {{userMainDetails.contact_no}}
            </p>
          </div>
        </div>
      </div>


      <div class="field is-horizontal">
        <div class="field-label">
          <p>Date of birth</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{moment(userMainDetails.dob).format('LL')}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Gender</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{userMainDetails.gender}}
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
            <p class="control" v-if="userMainDetails.user">
              {{userMainDetails.user.alternate_email}}
            </p>
          </div>
        </div>
      </div>

      <br>
    </div>

    <h2 class="title">Address</h2>


    <div class="form">
      <div class="field is-horizontal">
        <div class="field-label">
          <p>Primary Address</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{userMainDetails.perm_address}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-right">
          <p>Current Address</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{userMainDetails.temp_address}}
            </p>
          </div>
        </div>
      </div>

      <EditStudentProfileModal :studentMainDetails="studentMainDetails" :studentPrivateDetails="studentPrivateDetails"
       v-if="showModal" @close="showModal=false">
      </EditStudentProfileModal>

      <p class="control student-profile">
        <button class="button is-success" @click="modalPage">Edit Details</button>
      </p>

    </div>
  </div>

</template>

<script>
import EditStudentProfileModal from '@/components/Student/EditStudentProfileModal';
export default {
  name: 'student-about-tab',
  data() {
    return {
      showModal: false,
      studentMainDetails : {
      },
      studentPrivateDetails: {
      },
    }
  },

  props: {
    userMainDetails: {
      required: true,
      type: Object
    },
    userPrivateDetails: {
      required: true,
      type: Object
    }
  },

  created() {
    this.studentMainDetails = this.userMainDetails;
    // this.$bus.$on('close', (data) => {
    //   this.showModal = false;
    //   // this.studentDetails = this.userMainDetails;
    //   // this.studentDetails.user.alternate_email = data.alternate_email
    // })
  },
  methods: {

    modalPage() {
      this.studentMainDetails = this.userMainDetails;
      this.showModal = true;
    },

  },

  components: {
    EditStudentProfileModal
  },
}
</script>

<style lang="scss">
.student-about-tab
{
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
}
</style>
