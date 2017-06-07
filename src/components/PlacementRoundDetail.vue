<template>
<div class="placement-round-detail">
  <a @click="hidden=false" v-if="hidden">View Info</a>
  <div class="box" v-if="!hidden">
    <p>
      Date &amp; Time: <b>{{round.date_of_round}}</b>
    </p>
    <p class="round-description">
      {{round.round_description}}
    </p>
  </div>
  <a @click="hidden=true" v-if="!hidden">Hide Info</a>

</div>
</template>

<script>
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'admin-edit-modal',
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hidden: true
    };
  },
  created() {
    // console.log(this.round);
  }
}
</script>
<style lang="scss">
.placement-round-detail {
    .box {
        margin-top: 10px;

        .round-description {
            // margin-top: 10px;
            padding: 1rem;
        }
    }
}
</style>
