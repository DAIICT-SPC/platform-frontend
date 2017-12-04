<template>
<div class="draft-placements">

  <div class="columns is-multiline" v-if="showData">

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
            Job Title:&nbsp; <b>{{drafts.job_title}}</b><br /> Location:&nbsp; <b>{{drafts.location}}</b> <br /> Job Type:&nbsp; <b>{{drafts.job_type.job_type}}</b><br> Package:&nbsp;&nbsp;
            <b>{{drafts.package}}</b>
          </div>
        </div>
        <footer class="card-footer">
          <router-link :to="{ name: 'draft-placement-details', params: { placement_id: drafts.placement_id } }" class="card-footer-item"> Edit </router-link>
          <a @click="alert" class="card-footer-item"> Start </a>
        </footer>
      </div>
    </div>

  </div>

  <div class="box" v-if="!showData">
    <h1 class="title">No Drafts</h1>
  </div>

</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'draft-placements',
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
    alert() {
      this.swal({
        // title: 'Are you sure?',
        text: "Start the Placement Drive?",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#428aff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: true
      }).then(() => {
        this.startPlacement();
      })
    },
    getDraftPlacements() {
      company.getDraftPlacements(this.getUserId())
        .then((response) => {
          if (response.data == 'No Placements!') {
            this.showData = false;
          } else {
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
            duration: 3000
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
.draft-placements {

    .column .card {
        border-radius: 4px;
        box-shadow: 0 4px 5px #d0cfcf;
    }
    .is-info,
    .tag.is-success {
        padding-bottom: 3px;
    }

    .box {
        border-radius: 4px;
        box-shadow: 0 4px 5px #d0cfcf;
        border: none;
    }

    .icon {
        padding-right: 25px;
    }
}
</style>
