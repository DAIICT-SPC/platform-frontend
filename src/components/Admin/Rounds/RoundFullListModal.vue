<template>
<div class="round-full-list-modal">

  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">List</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">

        <div class="section-body" v-for="st in students" v-if="!noData">
          <div class="part1">
            <span class="enroll">{{st.enroll_no}}</span>
            <span>{{st.user.name}}</span>
          </div>
          <div class="part2">
            <span>{{st.category.name}}</span>
          </div>
        </div>

        <div class="" v-if="noData">
          <h3 class="title">No data present at the moment.</h3>
        </div>

      </section>
      <footer class="modal-card-foot">
        <a class="button" @click="$emit('close')">Cancel</a>
      </footer>

    </div>
  </div>
</div>
</template>

<script>
import admin from '@/api/admin';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'round-full-list-modal',
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.round_id = this.$route.params.round_id;
    this.getAllStudents();
  },
  data() {
    return {
      students: [],
      placement_id: null,
      season_id: null,
      round_id: null,
      noData: false
    };
  },
  methods: {
    getAllStudents() {
      admin.getRoundwiseList( this.getUserId(), this.placement_id, this.round_id )
        .then( ( response ) => {
          if ( response.status == 200 ) {
            if ( response.data.length == 0 ) {
              this.noData = true;
            } else {
              this.students = response.data;
              this.noData = false;
            }
          }
        } )
        .catch( ( error ) => {
          if ( error.response.data.message == "Can't fetch students!" ) {
            this.noData = true;
            this.$toasted.error( error.response.data.message, {
              theme: "outline",
              position: "bottom-center",
              duration: 3000
            } );
          } else {
            console.log( error );
          }
        } )
    },
    getUserId() {
      return Auth.getUserToken();
    }
  }

}
</script>

<style lang="scss">
.round-full-list-modal {

    .modal-card {
        margin-bottom: 10rem;
    }

    .modal-card-head {
        padding: 1rem;
    }

    .modal-card-foot {
        padding: 0.8rem;
        display: flex;
        justify-content: flex-end;
    }

    .modal-card-body {
        padding: 1rem;
    }

    .section-body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 340px;
        padding-left: 1rem;
        padding-bottom: 0.3rem;
    }

    .column {
        display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 0.2rem;
    }

    .columns {}

}
</style>
