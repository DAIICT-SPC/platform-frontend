<template lang="html">
  <div class="jobprofile-page">
    <div class="container">

      <!-- main div starts -->
      <div class="columns is-multiline">

        <!-- 1/3 col -->
        <div class="column is-one-third" v-for="jobs in jobProfiles" v-if="!jobsNull">
          <div class="card">

            <div class="card-header">
              <p class="card-header-title">
                {{ jobs.job_title }}
              </p>

              <span>
                <span class="tag is-success">{{jobs.status}}</span>
              </span>

            </div>
            <div class="card-content">
              <div class="content">
                Company:&nbsp;<b>Dummy</b><br>
                Location:&nbsp;<b>{{jobs.location}}</b>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name: 'view-job-profile', params: { id: jobs.placement_id } }" class="card-footer-item">View</router-link>
              <a class="card-footer-item">Apply</a>
            </footer>
          </div>
          <!-- 1/3 col -->
          <!-- <pre>
          {{ jobs }}
        </pre> -->
      </div>
      <div class="column is-full" v-if="jobsNull">
        <div class="media media-card">
          There are no jobs to follow.
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
  name: 'jobprofile',
  created() {
    user.getUserJobProfile(this.getUserId())
    .then((response) => {
      if(response.data[0] == null) {
        this.jobsNull = true;
      }
      else {
        this.jobProfiles = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
      jobProfiles: [],
      jobsNull: false
    }
  },
  methods: {
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.jobprofile-page {
  .column .card {
    border-radius: 4px;
    box-shadow: 0px 4px 5px #d0cfcf;
  }
  .card-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tag.is-success{
      margin: 0.5rem;
    }
  }
}

</style>
