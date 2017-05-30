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
              {{user.erno}}
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
              {{user.name}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Programe Name</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{user.course}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Enrollment Date</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{user.erdate}}
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
              {{user.contact}}
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
              {{user.dob}}
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
              {{user.gender}}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <p>Category</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{user.category}}
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
              {{user.address.primary}}
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
              {{user.address.temporary}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- box ends -->
</template>

<script>
export default {
  name: 'about',
  props: {
    user: {
      required: true,
      type: Object
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
