<template>
  <div class="view-all-placement-page">
    <div class="container">

      <!-- main div starts -->
      <div class="columns is-multiline" v-if="showData">

        <!-- 1/3 col -->
        <div class="column is-one-third" v-for="drafts in draftPlacements">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ drafts.placement_season.title }}
                <input type="hidden" v-model="placement_id = drafts.placement_id">
              </p>
              <a class="card-header-icon">
                <span class="icon">
                  <span class="tag is-success">{{ drafts.status }}</span>
                </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                Job Title:&nbsp; <b>{{drafts.job_title}}</b><br />
                Location:&nbsp; <b>{{drafts.location}}</b> <br />
                Job Type:&nbsp; <b>{{drafts.job_type.job_type}}</b><br>
                Package:&nbsp;&nbsp;<b>{{drafts.package}}</b>
              </div>
            </div>
            <footer class="card-footer">
              <router-link :to="{ name: 'draft-placement-details', params: { placement_id: drafts.placement_id } }"
              class="card-footer-item"> Edit </router-link>
              <a @click="askModal = true" class="card-footer-item"> Start </a>
              <AskModal :message="message" v-if="askModal" @close="askModal = false"></AskModal>
            </footer>
          </div>
        </div>

      </div>

      <div class="box" v-if="!showData">
        <h1 class="title">No Drafts</h1>
      </div>
      <!-- main div ends -->
    </div>
  </div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import AskModal from '@/components/AskModal';

export default {
  name: 'view-all-placement',
  components: {
    AskModal
  },
  created() {
    this.getDraftPlacements();

    this.$bus.$on('yes', () => {
      this.askModal = false;
      this.startPlacement();
    })
  },
  data() {
    return {
      draftPlacements: [],
      placement_id: null,
      showData: false,
      askModal: false,
      message: 'to start the Placement Drive'
    };
  },
  methods: {
    getDraftPlacements() {
      company.getDraftPlacements(this.getUserId())
      .then((response) => {
        if(response.data == 'No Placements!') {
          this.showData = false;
        }
        else {
          this.showData = true;
          this.draftPlacements = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    startPlacement() {
      company.startPlacement(this.getUserId(), this.placement_id)
      .then((response) => {
        let toast = this.$toasted.success("Placement Drive has been Initiated.", {
          theme: "outline",
          position: "top-center",
          duration : 3000
        });
        this.getDraftPlacements();
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

  .box {
    border-radius: 4px;
    box-shadow: 0px 4px 5px #d0cfcf;
    border: none;
  }

  .icon {
    padding-right: 25px;
  }
}
</style>
