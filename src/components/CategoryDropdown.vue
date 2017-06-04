<template lang="html">
  <div>
    <select v-model="category_id" @change="categoryChange()" name="category" >
      <option value=null>Select dropdown</option>
      <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
    </select>

  </div>
</template>

<script>
import category from '@/api/category'

export default {
  name: 'category-dropdown',
  props: {
    category_id_old : null
  },
  created() {
    // console.log("id received in dropdown");
    // console.log(this.category_id_old);
    this.category_id = this.category_id_old;
    // console.log("id set in dropdown");
    // console.log(this.category_id);
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
  beforeUpdate() {
    this.$bus.$emit('category-change-before', { id: this.category_id });
  },
  methods: {
    categoryChange() {
      this.$bus.$emit('category-change', { id: this.category_id });
    }
  }
}
</script>
