<template>
<div class="admin-profile-page">
  <div class="box">


    <div class="admin-profile header">
      <h2 class="title">Overview</h2>
    </div>

    <div class="admin-profile body">
      <div class="field is-horizontal abt-admin">
        <div class="field-label">
          <p>Admin Name</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{ adminDetails.name }}
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal abt-admin">
        <div class="field-label">
          <p>Email</p>
        </div>
        <div class="field-body">
          <div>
            <p class="control ">
              {{ adminDetails.email }}
            </p>
          </div>
        </div>
      </div>

      <modal :adminDetails="adminDetails" v-if="showModal" @close="showModal = false"></modal>

    </div>

    <div class="admin-profile-footer">
      <div class="field is-grouped">
        <p class="control admin-profile">
          <button class="button is-success" v-on:click="showModal=true">Edit Details</button>
        </p>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';
import EditAdminProfileModal from '@/components/EditAdminProfileModal';

export default {
  name: 'admin-profile-page',
  components: {
    'modal': EditAdminProfileModal
  },
  created() {
    admin.getUserDetails( this.getUserId() )
      .then( ( response ) => {
        // shows only name, email and profilepicture
        this.adminDetails = response.data;
      } )
      .catch( ( error ) => {
        console.log( error );
      } )
  },
  data() {
    return {
      showModal: false,
      adminDetails: {}
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
.admin-profile-page {

    .box {
        padding: 0;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    }

    .admin-profile.header {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .admin-profile.body {
        // padding: 1.5rem 1.5rem 0;
        padding: 1.5rem 1.5rem 0;
    }

    .abt-admin {
        border-bottom: solid 1px #ddd;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        .field-label {
            text-align: left;
            font-weight: bold;
        }
    }

    .field:last-child {
        border-bottom: none;
        margin: 0;
    }

    .admin-profile-footer {
        padding: 1rem;
        border-top: solid 1px #ddd;

    }
}
</style>
