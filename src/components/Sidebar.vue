<template>
  <div class="card profile-sidebar">
    <div class="profile-image">
      <figure class="image is-square">
        <img src="../../images/lotus.jpg" alt="Image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <h2 class="title is-4" align="center">{{user.name}}</h2>
        </div>
      </div>

      <hr>

      <div class="content main-content">
        <div class="profile-meta">
          <div>4th Semester | M.Tech</div>
          <div>2018 Passout Batch</div>
          <div>Department of Computer Science</div>
        </div>
        <hr>
        <div class="profile-info">
          <div class="info">
            <span class="content-value">7.10</span>
            <span class="content-label">CGPA</span>
          </div>

          <div class="info">
            <span class="content-value">0</span>
            <span class="content-label">APPLICATIONS</span>
          </div>

          <div class="info">
            <span class="content-value">0</span>
            <span class="content-label">OFFERS</span>
          </div>

        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    user: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="css">

.profile-box {
  padding: 0;
}

.profile-sidebar {
  font-weight: normal;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  text-align: center;
}

.profile-sidebar .title {
  margin-top: 0;
  font-weight: normal;
}

.profile-image {
  padding: 1rem;
  padding-bottom: 0;
}

.profile-image img {
  border-radius: 4px;
}

.main-content{
  margin-top: 20px;
}

.profile-meta {
  font-size: 0.9rem;
}

.profile-info .info {
  margin-bottom: 1rem;
}

.profile-info .info .content-value {
  display: block;
  color: #3273dc;
  font-size: 1.5rem;
}

.profile-info .info .content-label {
  font-size: 0.8rem;
  color: grey;
}

</style>
