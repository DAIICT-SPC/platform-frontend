<template lang="html">
  <div class="academic-tab">

    <div class="section-top">
      <h2 class="title">Current Course</h2>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Information Technology
          </p>
          <span class="academic-year">May 2012 - Mar 2016</span>
        </header>
        <div class="card-content">
          <div class="content">
            M.Tech, Information Technology, <br>
            Department of computer science <br>
            3AX12ED042087 | 2018 Passout Batch <br>
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">7.1 CGPA</span>
          <span class="card-footer-item">71% Score</span>
        </footer>
      </div>
    </div>


    <div class="section-bottom">

      <h2 class="title">Previous Education</h2>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            St. Xavier's High School
          </p>
          <span class="academic-year">2010 - 2011</span>
        </header>
        <div class="card-content">
          <div class="content">
            Karnataka Board <br>
            Senior Secondary Certificate
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">72.88% Score</span>
        </footer>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Vagdevi High School
          </p>
          <span class="academic-year">2008 - 2009</span>
        </header>
        <div class="card-content">
          <div class="content">
            Karnataka Board <br>
            High School Certificate
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">95.04% Score</span>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'academic'
}
</script>

<style lang="scss">
.academic-tab {

  .academic-year {
    padding: 1rem;
  }

  .section-bottom{
    padding: 1rem;
  }

  .section-bottom .card {
    margin-top: 1rem;
  }

}
</style>
