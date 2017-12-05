<template>
<div class="category-dropdown">

  <div class="field has-addons">
    <label>Select Category:</label>
    <span class="select">
      <select v-validate="'required|not_in:null'" v-model="category_id" @change="categoryChange" name="category" >
        <option value=null>Select dropdown</option>
        <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
      </select>
    </span>
  </div>

</div>
</template>

<script>
import category from '@/api/category'

export default {
  name: 'category-dropdown',
  props: [ 'cat_id' ],
  created() {
    this.category_id = this.cat_id;
    category.all().then( ( response ) => {
      this.categories = response.data;
    } )
  },
  data() {
    return {
      category_id: null,
      categories: []
    };
  },
  methods: {
    categoryChange() {
      this.$bus.$emit( 'category-change-admin', {
        category_id: this.category_id
      } );
    }
  }
}
</script>
<style lang="scss">
.category-dropdown {
    label {
        margin-right: 1rem;
        margin-top: 0.4rem;
    }
}
</style>
