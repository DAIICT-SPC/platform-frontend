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
            {{user.course}}, Information Technology, <br>
            {{user.someText}} <br>
            3AX12ED042087 | 2018 Passout Batch <br>
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">{{user.cpi}} CPI</span>
          <span class="card-footer-item">71% Score</span>
        </footer>
      </div>
    </div>


    <div class="section-bottom">

      <h2 class="title">Previous Education</h2>

      <div class="card" v-for="education in user.previousEducation">
        <header class="card-header">
          <p class="card-header-title">
            {{ education.name }}
          </p>
          <span class="academic-year">{{education.startYear}} - {{education.endYear}}</span>
        </header>
        <div class="card-content">
          <div class="content">
            {{education.board}}<br>
            Senior Secondary Certificate
          </div>
        </div>
        <footer class="card-footer">
          <span class="card-footer-item">{{education.score}}% Score</span>
        </footer>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'academic',
  props: {
    user: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss">
.academic-tab {

    .academic-year {
        padding: 1rem;
    }

    .section-bottom {
        margin-top: 1rem;

        .card {
            margin-top: 1rem;
        }

    }
}
</style>
