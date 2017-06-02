<template>
  <div class="placement-seasons-admin-home">
    <div class="container">

      <!-- main div starts -->
      <div class="columns is-multiline">

        <!-- 1/3 col -->
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Civil Engineer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-success">Open</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>DLF</b><br>
                Location:&nbsp;<b>Banglore, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name: 'view-placement-detail', params: { id: 1 } }" class="card-footer-item">View</router-link>
            </footer>
          </div>
        </div>
        <!-- 1/3 col -->

        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Software Developer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-info">Applied</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>MAQ</b><br>
                Location:&nbsp;<b>Hydrabad, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">View</a>
            </footer>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Software Developer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-info">Applied</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>MAQ</b><br>
                Location:&nbsp;<b>Hydrabad, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">View</a>
            </footer>
          </div>
        </div>

        <!-- 1/3 col -->
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Civil Engineer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-success">Open</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>DLF</b><br>
                Location:&nbsp;<b>Banglore, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">View</a>
            </footer>
          </div>
        </div>
        <!-- 1/3 col -->

        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Software Developer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-info">Applied</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>MAQ</b><br>
                Location:&nbsp;<b>Hydrabad, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">View</a>
            </footer>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Software Developer
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag">Closed</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Compony:&nbsp;<b>MAQ</b><br>
                Location:&nbsp;<b>Hydrabad, India</b>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item">View</a>
            </footer>
          </div>
        </div>
      </div>
      <!-- main div ends -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'placement-seasons-admin-home'
}
</script>

<style lang="scss">
.placement-seasons-admin-home {
  .container {
    padding: 0;
  }

  .column .card{
    border-radius: 4px;
    box-shadow: 0px 4px 5px #d0cfcf;
  }
  .tag.is-success, .is-info{
    padding-bottom: 3px;
  }

  .icon {
    padding-right: 25px;
  }
}
</style>
