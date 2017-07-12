<template lang="html">
  <div class="feedbackReadModal">
    <a @click="hidden = true" class="is-success view-profile" v-if="!hidden">Read</a>

    <div class="modal is-active" v-if="hidden">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{name}}</p>
          <button class="delete" @click="hidden = false"></button>
        </header>
        <section class="modal-card-body">

          "{{description}}"

        </section>
        <footer class="modal-card-foot">
          Ratings: &nbsp	<StarRating v-model="rating" :max-rating="5" :star-size="20" :show-rating=false
            :read-only=true></StarRating>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'feedbackReadModal',
  components: {
		StarRating
	},
  props: {
    description: {
      required: true
    },
    rating: {
      required: true
    },
    name: {
      required: true
    }
  },
  data() {
    return {
      hidden: false
    };
  },
}
</script>

<style lang="scss">
.feedbackReadModal {

}
</style>
