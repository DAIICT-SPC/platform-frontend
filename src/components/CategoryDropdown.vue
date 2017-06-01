<template lang="html">
  <select v-model="category_id" @change="categoryChange()" name="category" v-validate="'required'">
    <option value=null>Select dropdown</option>
    <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
  </select>
</template>

<script>
import category from '@/api/category'

export default {
  name: 'category-dropdown',
  created() {
    category.all().then((response) => {
      this.categories = response.data;
    })
  },
  data() {
    return {
      category_id: null,
      categories: []
    };
  },
  methods: {
    categoryChange() {
      this.$bus.$emit('category-change', { id: this.category_id });
    }
  }
}
</script>
