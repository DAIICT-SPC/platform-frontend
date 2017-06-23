<template lang="html">
  <div class="page-404">
    <div class="container">
      <div class="box">
        <div class="header">
          <h1 class="title">404</h1>
          <a @click="pushHome" class="button">Get Back To Home</a>
        </div>
        <h3 class="subtitle">The page you were looking for may exist outside our campus.;)</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-404',
  methods: {
    pushHome() {
      this.$router.push({
        name: 'home'
      });
    }
  }
}
</script>

<style lang="scss">
.page-404 {
  .container {
    padding: 1rem;
  }
  .box {
    border-radius: 4px;
    box-shadow: 0px 4px 5px #d0cfcf;
    display: table;
    padding-top: 0;
    padding-bottom: 1rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .title {
        font-size: 10rem;
      }
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: solid 1px #ddd;
    }
  }
}
</style>
