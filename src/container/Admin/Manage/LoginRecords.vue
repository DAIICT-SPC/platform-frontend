<template lang="html">
  <div class="login-records">
    <div class="box">

      <div class="header">
        <!-- admin -->
        <h3 class="title">Login Records</h3>
      </div>
      <div class="body">
        <div class="body-header">
          <h3 class="title is-4">Admin</h3>
        </div>
          <!-- Records -->
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="ad in admin">
              <div class="card">
                <div class="card-content">
                  <p class="title main-title-reason">
                    “{{ad.reason}}”
                  </p>
                  <div class="foot">
                    <p class="subtitle">
                      by {{ad.from_users.name}}
                    </p>
                    <reason-read-modal :key="ad.id" :reason="ad.reason" :name="ad.from_users.name"></reason-read-modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="loop" v-for="ad in admin">
          Reason-{{ad.reason}} <br />
          Name-{{ad.from_users.name}}
        </div> -->
      <!-- company -->
      <div class="body-header">
        <h3 class="title is-4">Company</h3>
      </div>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="com in company">
          <div class="card">
            <div class="card-content">
              <p class="title main-title-reason">
                “{{com.reason}}”
              </p>
              <div class="foot">
                <p class="subtitle">
                  by {{com.from_users.name}} to {{com.to_users.name}}
                </p>
                <reason-read-modal :key="com.id" :reason="com.reason" :name="com.from_users.name"
                :to_name="com.to_users.name"></reason-read-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';
import ReasonReadModal from '@/components/Admin/ReasonReadModal';


export default {
  name: 'login-records',
  components: {
		'reason-read-modal': ReasonReadModal
	},
  created() {
    this.getAdminRecords();
    this.getCompanyRecords();
  },
  data() {
    return {
      showAdmin: false,
      admin: [],
      showCompany: false,
      company: []
    };
  },
  methods: {
    getAdminRecords() {
      admin.getLoginRecordsForAdmin(this.getUserId())
      .then((response) => {
        this.admin = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getCompanyRecords() {
      admin.getLoginRecordsForAdmin(this.getUserId())
      .then((response) => {
        this.company = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    },
    getUserId() {
      return Auth.getUserToken();
    }
  },
}
</script>

<style lang="scss">
.login-records {

  .header {
    border-bottom: solid 1px #ddd;
  }

  // .column {
  //   padding: 0;
  // }

  .body {
    padding: 1rem;
    .card {
      .card-content {
        padding-left: 1rem;
      }
      margin: 0;
			.main-title {
				white-space: nowrap;
				width: 11em;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.main-title-reason {
				white-space: nowrap;
				width: 10em;
				overflow: hidden;
				text-overflow: ellipsis;
        margin-bottom: 0;
			}
			// margin: 1rem;
			max-width: 25rem;
		}
  }

  .foot {
    display: flex;
    // align-items: center;
    justify-content: space-between;
    .subtitle {
      padding-left: 1rem;
      margin: 0;
    }
  }
}
</style>
