<template>
<div>
  <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="category_id" @change="categoryChange" name="category" >
        <option value=''>Select dropdown</option>
        <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
      </select>
    </span>
</div>
</template>

<script>
import category from '@/api/category';

export default {
  name: 'category-dropdown',
  props: [ 'category_id_old' ],
  created() {
    if ( this.category_id_old == undefined ) {
      this.category_id = null;
    } else {
      this.category_id = this.category_id_old;
    }
    category.all().then( ( response ) => {
      this.categories = response.data;
    } )
  },
  data() {
    return {
      category_id: null,
      categories: [],
    };
  },
  beforeUpdate() {
    this.$bus.$emit( 'category-change-before', {
      id: this.category_id
    } );
  },
  methods: {
    categoryChange() {
      this.$bus.$emit( 'category-change', {
        id: this.category_id
      } );
    }
  }
}
</script>
