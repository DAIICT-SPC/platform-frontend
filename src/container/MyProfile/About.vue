<template lang="html">
  <div>


    <div class="columns is-mobile">
      <div class="column"><h1 id="head1"><b>Overview</b></h1></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
    <hr id="hr1-resume">
    <!-- form data starts -->
    <div class="form" style="margin-left: 50px;">
      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Student Id</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              201612065
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Name</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              Vamsi Krishna
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Programe Name</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              Msc.IT
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Enrollment Date</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              01/08/2016
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Contact No</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              9898441324
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">


      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Date of birth</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              01/01/1995
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Gender</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              Male
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Category</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              General
            </p>
          </div>
        </div>
      </div>
      <br>
    </div>
    <!-- form data ends -->

    <div class="columns is-mobile">
      <div class="column"  id="address-column"><h1 id="head1"><b>Address</b></h1></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
    </div>
    <hr id="hr1-resume">


    <div class="form" style="margin-left: 50px;">
      <div class="field is-horizontal">
        <div class="field-label">
          <p align="left">Primary Address</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              Gandhidham
            </p>
          </div>
        </div>
      </div>
      <hr id="hr2">

      <div class="field is-horizontal">
        <div class="field-label is-right">
          <p align="left">Current Address</p>
        </div>
        <div class="field-body">
          <div class="field is-grouped">
            <p class="control ">
              Gandhinagar
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
  name: 'about'
}
</script>

<style lang="css">

#box{
  margin-top: 22px;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
  padding: 0px 0px 0px 0px;
}

#col1{
  width: 224px;
}

#head1{
  font-size: 20px;
  margin-left: 25px;
}

#hr2{
  margin-top: 0px;
  margin-right: 50px;
}

#profile-card{
  width: 240px;
  height: 650px;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
}

#image{
  width: 200px;
  height: 200px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#name{
  font-size: 20px;
  margin-top: 20px;
}

#address-column{

    padding-top: 4px;

}

</style>
