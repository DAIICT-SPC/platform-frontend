<template lang="html">
  <div class="container">
    <!-- media content starts -->
    <div class="dashboard-body">

      <div class="columns is-multiline">
        <div class="column is-full" v-if="!feedsNull">
          <div  v-for="feed in feeds">
            <article class="media media-card">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="../../images/daiict.jpg">
                </p>
              </figure>
              <div class="media-content" >
                <div class="content">
                  <div>
                    <strong>Placement cycle {{ feed.placement_season.title }}</strong> <span class="is-pulled-right tag is-success">{{ feed.status }}</span>
                  </div>
                  <small>{{ feed.created_at }}</small> <br>
                  <p class="p-content"><b>Job Title: </b>{{ feed.job_title }}
                    <br>
                    <b>Job Description: </b>{{ feed.job_description }}
                  </p>
                  <div class="placement-courses">
                    <span class="tag is-info" v-for="cat in feed.categories">{{ cat.name }}</span>
                  </div>
                </div>
              </div>
            </article>
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
  name: 'feed',
  data() {
    return {
      feeds: { },
      feedsNull: false
    }
  },
  created(){
    user.getHomeDashboard(this.getUserId()).then((response) => {
      this.presentFeeds(response);
    })
    .catch((error) => {
      console.log(error);
    });

  },
  methods: {
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

.container {
  padding-left: 15px;

  .dashboard-body {
    padding: 0;
  }

  .column {
    .media.media-card {
      margin-top: 15px;
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
