<template lang="html">
  <div class="box">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Offer Letter {{ roundID }}</p>
          <button class="delete" @click="$emit('close')"></button>
        </header>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-page',
  props: {
    roundID: {
      required: true
    }
  },
  created() {
    console.log(this.roundID);
  }
}
</script>

<style lang="scss">
.modal-page {

}
</style>
