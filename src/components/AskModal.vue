<template lang="html">
  <div class="ask-modal">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Are you sure you want {{message}}?</p>
        </header>
        <!-- <section class="modal-card-body">
          Are you sure you want {{message}}?
        </section> -->
        <footer class="modal-card-foot">
          <a class="button is-success" @click="yes">Save changes</a>
          <a class="button" @click="$emit('close')">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ask-modal',
  props: ['message'],
  methods: {
    yes() {
      this.$bus.$emit('yes');
    }
  }
}
</script>

<style lang="scss">
.ask-modal {

}
</style>
