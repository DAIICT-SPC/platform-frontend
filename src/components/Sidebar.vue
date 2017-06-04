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
          <h2 class="title is-4" align="center">{{ userMainDetails.name }}</h2>
        </div>
      </div>

      <hr>

      <div class="content main-content"  v-if="userMainDetails.category">
        <div class="profile-meta">
          <div>Semester {{  }} | {{ userMainDetails.category.name }}</div>
          <div>2018 Passout Batch</div>
          <div>{{  }}</div>
        </div>

        <hr>

        <div class="profile-info">
          <div class="info">
            <span class="content-value">{{ userEducationcpi }}</span>
            <span class="content-label">CPI</span>
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
    userMainDetails: {
      required: true,
      type: Object
    },
    userEducationcpi: null
  },
  created() {
    // console.log("SideBar");
    // console.log(this.userMainDetails);
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
