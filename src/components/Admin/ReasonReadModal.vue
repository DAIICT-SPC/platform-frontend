<template lang="html">
  <div class="reason-read-modal">
    <a @click="hidden = true" class="is-success view-profile" v-if="!hidden">Read</a>

    <div class="modal is-active" v-if="hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Reason</p>
          <button class="delete" @click="hidden = false"></button>
        </header>
        <section class="modal-card-body">

          "{{reason}}"

        </section>
        <footer class="modal-card-foot">
          <span>By: {{name}}</span>  <span v-if="to_name"> To: {{to_name}}</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reason-read-modal',
  props: {
    reason: {
      required: true
    },
    name: {
      required: true
    },
    to_name: {

    }
  },
  created() {
  },
  data() {
    return {
      hidden: false
    };
  },
}
</script>

<style lang="scss">
.reason-read-modal {
  span {
    padding-right: 0.5rem;
  }
}
</style>
