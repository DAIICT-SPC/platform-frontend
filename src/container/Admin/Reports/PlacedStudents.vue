<template>
<div class="placed-students">

  <div v-if="showData">
    <div class="columns section-header">
      <div class="column">
        <span class="title is-4">EnrollNo</span>
      </div>
      <div class="column is-4">
        <span class="title is-4">Name</span>
      </div>
      <div class="column">
        <span class="title is-4">Category</span>
      </div>
      <div class="column">
        <span class="title is-4">Package</span>
      </div>
      <div class="column is-4">
        <span class="title is-4">Company</span>
      </div>
    </div>

    <div class="columns section-body" v-for="st in students">
      <div class="column">
        <span class="texts">{{st.enroll_no}}</span>
      </div>
      <div class="column is-4" v-if="st.student">
        <span class="texts">{{st.student.user.name}}</span>
      </div>
      <div class="column" v-if="st.student">
        <span class="texts">{{st.student.category.name}}</span>
      </div>
      <div class="column">
        <span class="texts">{{st.package}}</span>
      </div>
      <div class="column is-4" v-if="st.placement">
        <span class="texts">{{st.placement.company.company_name}}</span>
      </div>
    </div>
  </div>

  <div class="no-students" v-if="!showData">
    <h3 class="title">No Students have been Placed!</h3>
  </div>

</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import admin from '@/api/admin';

export default {
  name: 'placed-students',
  created() {
    this.season_id = this.$route.params;
    this.getPlacedStudents();
  },
  data() {
    return {
      students: [],
      season_id: null,
      showData: false
    };
  },
  methods: {
    getPlacedStudents() {
      admin.getPlacedStudents( this.getUserId(), this.season_id )
        .then( ( response ) => {
          if ( response.data == 'No Placements for this season!' ) {
            this.showData = false;
          } else if ( response.data == "No Student got Offer!" ) {
            this.showData = false;
          } else if ( response.data.length != 0 ) {
            this.showData = true;
            this.students = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }
}
</script>

<style lang="scss">
.placed-students {

    margin-bottom: 2rem;
    padding: 0 1rem 1rem;

    .section-header {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
        padding-bottom: 0;
    }

    .columns {
        margin: 0;
    }

    .section-body {
        margin-left: 1rem;
    }

    .no-students {
        padding: 1rem;
    }
}
</style>
