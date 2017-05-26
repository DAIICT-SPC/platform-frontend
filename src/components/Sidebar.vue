<template>
<div class="card profile-sidebar">

  <div class="profile-image">
    <figure class="image is-128x128">
      <img src="../../images/lotus.jpg" alt="Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <h2 class="title is-4" align="center">{{ user.name }}</h2>
      </div>
    </div>

    <hr>

    <div class="content main-content">
      <div class="profile-meta">
        <div>Semester {{ user.curSem }} | {{ user.course }}</div>
        <div>2018 Passout Batch</div>
        <div>{{ user.someText }}</div>
      </div>

      <hr>

      <div class="profile-info">
        <div class="info">
          <span class="content-value">{{ user.cpi }}</span>
          <span class="content-label">CPI</span>
        </div>

        <div class="info">
          <span class="content-value">{{ user.apps }}</span>
          <span class="content-label">APPLICATIONS</span>
        </div>

        <div class="info">
          <span class="content-value">{{ user.offers }}</span>
          <span class="content-label">OFFERS</span>
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

<style lang="scss">
.profile-sidebar {
    font-weight: normal;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    text-align: center;
    .title {
        margin-top: 0;
        font-weight: normal;
    }

    .profile-image {
        padding-bottom: 0;

        .image {
          margin: auto;
        }

        img {
            border-radius: 50%;
            height: 100%;
        }
    }

    .main-content {
        margin-top: 20px;
    }

    .content.main-content {
        .profile-meta {
            font-size: 0.9rem;
        }
    }

    .profile-info {
        .info {
            margin-bottom: 1rem;
            .content-value {
                display: block;
                color: #3273dc;
                font-size: 1.5rem;
            }
            .content-label {
                font-size: 0.8rem;
                color: grey;
            }
        }
    }
}
</style>
