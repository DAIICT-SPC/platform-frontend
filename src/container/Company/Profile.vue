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
                  Daiict
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
                  Gandhinagar
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
                  Gaurav
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
                  9999999999
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
                  College
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
                  daiict.ac.in
                </p>
              </div>
            </div>
          </div>

        </div>
        <!-- form data ends -->

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'myprofile-page',

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
  }
</style>
