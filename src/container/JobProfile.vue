<template lang="html">
  <div class="jobprofile-page">
    <div class="container">

      <!-- main div starts -->
      <div class="columns is-multiline">

        <!-- 1/3 col -->
        <div class="column is-one-third" v-for="jobs in jobProfiles">
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
                Company:&nbsp;<b>{{jobs.company.company_name}}</b><br>
                Location:&nbsp;<b>{{jobs.company.address}}</b>
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

      </div>
    </div>
  </div>
</template>

<script>
import user from '@/api/user'

export default {
  name: 'jobprofile',
  created() {
    user.getHomeDashboard().then((response) => {
      this.jobProfiles = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
      jobProfiles: []
    }
  },
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
      margin: 0.2rem;
    }
  }
}

</style>
