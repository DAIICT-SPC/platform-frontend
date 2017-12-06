<template lang="html">
  <div class="login-records">
    <div class="box">

      <div class="header">
        <h3 class="title">Login Records</h3>
      </div>
      <div class="body">

      <div class="admin-records">
        <div class="body-header">
          <h3 class="title is-3">Admin</h3>
        </div>
        <div class="columns is-multiline" v-if="!noAdminData">
          <div class="column is-one-third" v-for="ad in admin">
            <div class="card">
              <div class="card-content">
                <p class="title main-title-reason">
                  “{{ad.reason}}”
                </p>
                <div class="foot">
                  <p class="subtitle">
                    by {{ad.from_users.name}} <br>
                    <span class="icon is-small"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
                    {{moment(ad.created_at).format('MMMM Do YYYY, h:mm a')}}
                  </p>
                </div>
              </div>
              <footer class="card-footer">
                <reason-read-modal class="card-footer-item" :key="ad.id" :reason="ad.reason" :name="ad.from_users.name"
                :time="ad.created_at"></reason-read-modal>
              </footer>
            </div>
          </div>
        </div>
        <div class="noAdminData" v-if="noAdminData">
          <h3 class="title">No Records to show</h3>
        </div>
      </div>

        <div class="company-records">
        <div class="body-header">
          <h3 class="title is-3">Company</h3>
        </div>
        <div class="columns is-multiline" v-if="!noCompanyData">
          <div class="column is-one-third" v-for="com in company">
            <div class="card">
              <div class="card-content">
                <p class="title main-title-reason">
                  “{{com.reason}}”
                </p>
                <div class="foot">
                  <p class="subtitle">
                    by {{com.from_users.name}} to {{com.to_users.name}} <br>
                    <span class="icon is-small"><i class="fa fa-clock-o" aria-hidden="true"></i></span>
                    {{moment(com.created_at).format('MMMM Do YYYY, h:mm a')}}
                  </p>
                </div>
              </div>
              <footer class="card-footer">
                <reason-read-modal class="card-footer-item" :key="com.id" :reason="com.reason" :name="com.from_users.name"
                :to_name="com.to_users.name" :time="com.created_at"></reason-read-modal>
              </footer>
            </div>
          </div>
        </div>
        <div class="noCompanyData" v-if="noCompanyData">
          <h3 class="title">No Records to show</h3>
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
      company: [],
      date: '',
      noAdminData: false,
      noCompanyData: false
    };
  },
  methods: {
    getAdminRecords() {
      admin.getLoginRecordsForAdmin( this.getUserId() )
        .then( ( response ) => {
          if ( response.data.length == 0 ) {
            this.noAdminData = true;
          } else {
            this.noAdminData = false;
            this.admin = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
    getCompanyRecords() {
      admin.getLoginRecordsForCompany( this.getUserId() )
        .then( ( response ) => {
          if ( response.data.length == 0 ) {
            this.noCompanyData = true;
          } else {
            this.noCompanyData = false;
            this.company = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
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
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .body {
        .body-header {
            padding: 1rem;
        }
        .card {
            .card-content {
                padding: 1rem;
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
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 0;
            }
            max-width: 25rem;
        }
    }

    .columns.is-multiline {
        margin-bottom: 0;
        padding: 0.5rem;
    }

    .card-footer-item {
        padding: 0.5rem;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        .subtitle {
            padding-left: 1rem;
            margin: 0;
        }
    }

    .noAdminData {
        padding: 1rem;
        border: solid 1px #ddd;
    }

    .noCompanyData {
        border-top: solid 1px #ddd;
        padding: 1rem;
    }
}
</style>
