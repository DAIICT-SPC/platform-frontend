<template>
<div class="new-modal">

  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Round wise in offer</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>

      <section class="modal-card-body">

        <div class="columns" v-for="st in students" v-if="!noData">
          <div class="column">
            <span>{{st.enroll_no}}</span>
          </div>
          <div class="column">
            <span>{{st.user.name}}</span>
          </div>
          <div class="column">
            <span>{{st.category.name}}</span>
          </div>
        </div>
        <div class="" v-if="noData">
          <h3 class="title">No Students has been given the offer.</h3>
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
  name: 'new-modal',
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.getAllStudents();
  },
  data() {
    return {
      students: [],
      placement_id: null,
      season_id: null,
      noData: false
    };
  },
  methods: {
    getAllStudents() {
      admin.getOfferRoundList( this.getUserId(), this.placement_id )
        .then( ( response ) => {
          if ( response.data.length == 0 ) {
            this.noData = true;
          } else {
            this.students = response.data;
            this.noData = false;
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
.new-modal {

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

    .column {
        display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 0.2rem;
    }

    .columns {
        width: 340px;
        padding-left: 2rem;
    }

    span {
        font-size: 18px;
    }
}
</style>
