<template lang="html">
  <div class="container student-feed">
    <!-- media content starts -->
    <div class="dashboard-body">

      <div class="columns is-multiline">
        <div class="column is-full" v-if="!feedsNull" v-for="feed in feeds">
          <div class="media media-card">
            <!-- {{ placement_id = feed.placement_id }} -->
            <!-- <router-link :to="{ name: 'view-job-profile', params: { id: feed.placement_id } }" > -->
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="../../images/daiict.jpg">
                </p>
              </figure>
              <div class="media-content" >
                <div class="content">
                  <div>
                    <strong>Placement cycle {{ feed.placement_season.title }}</strong>
                    <span v-if="feed.status == 'application'" class="is-pulled-right tag is-success">{{ feed.status }}</span>
                    <span v-if="feed.status == 'closed'" class="is-pulled-right tag is-light">{{feed.status}}</span>
                  </div>
                  <small>{{ feed.created_at }}</small> <br>
                  <p class="p-content"><b>Job Title: </b>{{ feed.job_title }}
                    <br>
                    <b>Job Description: </b>{{ feed.job_description }}
                  </p>
                    <div class="placement-courses">
                      <span class="tag is-info" v-for="cat in feed.categories">{{ cat.name }}</span>
                      <router-link :to="{ name: 'view-job-profile',
                      params: { placement_id: feed.placement_id } }" >
                        <span class="tag is-light is-pulled-right">Click here for more details...</span></router-link>
                    </div>
                </div>
              </div>
            <!-- </router-link> -->
          </div>
        </div>

        <div class="column is-full" v-if="feedsNull">
          <div class="media media-card">
            There are no posts to follow.
          </div>
        </div>

      </div>

      <!-- <nav class="pagination is-centered">
      <a class="button pagination-previous ">Previous</a>
      <a class="button pagination-next ">Next</a>
    </nav> -->

  </div>
</div>
</template>

<script>
import user from '@/api/user'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'student-feed',
  data() {
    return {
      feeds: { },
      feedsNull: false,
      placement_id: null
    }
  },
  created() {
    this.getStudentDashboard();

  },
  methods: {
    getStudentDashboard() {
      user.getHomeDashboard(this.getUserId())
      .then((response) => {
        this.presentFeeds(response);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    presentFeeds(response) {
      if(response.data[0] == null){
        this.feedsNull = true;
      } else {
        this.feeds = response.data;
      }
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
// .student-feed
.container {
  padding-left: 15px;

  .dashboard-body {
    padding: 0;
  }

  .column {
    .media.media-card {
      background: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0px 4px 5px #d0cfcf;
      border: none;
      margin-right: 15px;

      .media-left {
        margin-left: 5px;
        margin-top: 5px;
      }
    }
  }

  .media-content {
    .p-content {
      padding-top: 10px;
    }
  }

  .pagination .is-centered{
    margin-top: 15px;
  }

  .placement-courses .tag {
    margin: 0.1rem;
  }
}

</style>
