<template>
  <div class="resume-page">

    <div class="resume-top">
      <h2 class="title">Resume</h2>
      <button class="button is-deafult">+ Add Resume</button>
    </div>

    <div class="resume-body">
      <div class="image is-64x64">
        <img src="../../../images/pdf.png" alt="pdf">
      </div>

      <div>
        <p><b>Result</b></p>
        <small>Created on 04:23 PM 06 Mar 2017</small>
      </div>
    </div>
    <div class="resume-body">
      <div class="image is-64x64">
        <img src="../../../images/pdf.png" alt="pdf">
      </div>

      <div>
        <p><b>Result</b></p>
        <small>Created on 04:23 PM 06 Mar 2017</small>
      </div>
    </div>




  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.resume-page {

  .resume-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: solid 1px #ddd;
    padding-bottom: 1rem;

    .title {
      margin-bottom: 0;
    }
  }

  .resume-body {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 1rem;
    border-bottom: solid 1px #ddd;

    .image {
      margin-right: 1rem;
    }
  }
}
</style>
