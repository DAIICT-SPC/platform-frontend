<template>
  <div class="view-all-placement-page">
    <div class="container">

      <!-- main div starts -->
      <div class="columns is-multiline">

        <!-- 1/3 col -->
        <div class="column is-one-third" v-for="company in companyDetails">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title" v-if="company.placement_season">
                {{ company.placement_season.title }}
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-success">{{ company.placement_season.status }}</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Job Title:&nbsp; <b>{{company.job_title}}</b><br />
                Location:&nbsp; <b>{{company.location}}</b> <br />
                Job Type:&nbsp; <b>{{company.job_type.job_type}}</b><br>
                Package:&nbsp;&nbsp;<b>{{company.package}}</b>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name: 'view-placement-detail', params: { placement_id: company.placement_id } }" class="card-footer-item">View</router-link>
            </footer>
          </div>
        </div>
        <!-- 1/3 col -->


      </div>
      <!-- main div ends -->
    </div>
  </div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'view-all-placement',
  created() {
    this.getDashboard();
  },
  data() {
    return {
      companyDetails: []
    };
  },
  methods: {
    getDashboard() {
      company.getCompanyDashboard(this.getUserId())
      .then((response) => {
        this.companyDetails = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }

}
</script>

<style lang="scss">
.view-all-placement-page {
  margin: 1.5rem;

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
