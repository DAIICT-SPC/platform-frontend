<template lang="html">
  <div class="about-tab">
    <h2 class="title">Overview</h2>

    <!-- form data starts -->
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
              {{userMainDetails.dob}}
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

      <br>
    </div>
    <!-- form data ends -->

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

      <modal :studentDetails="studentDetails" v-if="showModal" @close="showModal = false"></modal>


      <p class="control student-profile">
        <!-- <button class="button is-default" v-on:click="redirect">Edit</button> -->
        <button class="button is-success" @click="modalPage">Edit Details</button>
      </p>

    </div>
  </div>
  <!-- box ends -->
</template>

<script>
import EditStudentProfileModal from '@/components/EditStudentProfileModal'
export default {
  name: 'about',
  data() {
    return {
      showModal: false,
      studentDetails : {
        student_id: null,
        student_name: '',
        programme_name: '',
        contact_no: null,
        dob: '',
        gender: '',
        category: '',
        primary_address: '',
        current_address: ''
      }
    }
  },
  components: {
    'modal': EditStudentProfileModal
  },
  props: {
    userMainDetails: {
      required: true,
      type: Object
    }
  },
  created() {

  },
  methods: {

    modalPage() {

      this.studentDetails = this.userMainDetails;

      this.showModal = true;
    }
  }
}
</script>

<style lang="scss">
.about-tab
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
