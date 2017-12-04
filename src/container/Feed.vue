<template lang="html">
  <div class="student-feed">

    <div class="dashboard-body">

      <div class="columns is-multiline">
        <div class="column is-full" v-if="!feedsNull" v-for="feed in feeds">
          <div class="media media-card">

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
                <small>{{moment(feed.created_at).format('MMMM Do YYYY, h:mm a')}}</small>
                <p class="p-content"><b>Job Title: </b>{{ feed.job_title }}
                  <br>
                  <b>Job Description: </b>{{ feed.job_description }}
                </p>
                <div class="placement-courses">
                  <div>
                    <span class="tag is-info" v-for="cat in feed.categories">{{ cat.name }}</span>
                  </div>
                  <router-link :to="{ name: 'view-job-profile',
                  params: { placement_id: feed.placement_id } }" >
                  <span class="button">Click here for more details...</span></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column is-full" v-if="feedsNull">
          <div class="media media-card">
            There are no posts to follow.
          </div>
        </div>

      </div>

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
.student-feed {
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

  .placement-courses{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tag {
      margin: 0.1rem;
    }
  }
}

</style>
