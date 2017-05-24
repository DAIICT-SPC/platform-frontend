<template>
  <div>

    <div class="columns is-mobile">
      <div class="column"><h1 id="head1"><b>Resume</b></h1></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"><button class="button is-deafult">+ Add Resume</button></div>
    </div>

    <hr id="hr1-resume">

    <div id="parent-resume-data">
      <div id="child-one-img-resume">
        <img id="img" src="../../../images/pdf.png" alt="pdf">
      </div>

      <div id="child-two-data-resume">
        <p><b>Result</b></p>
        <small>Created on 04:23 PM 06 Mar 2017</small>
      </div>
    </div>

    <hr id="hr2-resume">
    <div id="parent-resume-data">
      <div id="child-one-img-resume">
        <img id="img" src="../../../images/pdf.png" alt="pdf">
      </div>

      <div id="child-two-data-resume">
        <p><b>Result</b></p>
        <small>Created on 04:23 PM 06 Mar 2017</small>
      </div>
    </div>

    <hr id="hr2-resume">


  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">

#hr1-resume{
  margin-top: -15px;
  margin-left: 30px;
  margin-right: 60px;
}

#hr2-resume{
  margin-top: 5px;
  margin-left: 30px;
  margin-right: 60px;
}

#head1{
  margin-top: 5px;
}

#button{
  position: absolute;
  top: 90px;
  left: 900px;
}

#one-quarter {
  padding-left: 100px;
}

#parent-resume-data{
  padding-left: 30px;
  margin-bottom: 45px;
}

#child-one-img-resume{
  float: left;
  width: 80px;
}

#child-two-data-resume{
  padding-left: 90px;
  padding-top: 10px;
}

</style>
