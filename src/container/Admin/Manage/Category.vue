<template>
<div class="category-page">

  <div class="cat-title">
    <h2 class="title">Category</h2>
  </div>

  <div class="cat-body">
    <div class="category-items" v-for="category,index in categories">
      <span> {{ category.name }}</span>
      <a class="icon is-small" @click="askForDeleteCategory(category.id)"> <i class="fa fa-trash-o"></i> </a>
    </div>
  </div>

  <div class="add-category">
    <div class="field has-addons">
      <p class="control">
        <input v-validate="'required'" v-model="title" :class="{'input': true, 'is-danger': errors.has('cat') }" name="cat" type="text" placeholder="Enter New Category">
      </p>
      <p class="control">
        <a class="button is-success" @click="addCategory"> Add Category </a>
      </p>
    </div>
  </div>

</div>
</template>

<script>
import category from '@/api/category'

export default {
  name: 'category-page',
  created() {
    this.getAllCategories();
  },
  data() {
    return {
      categories: [],
      title: ''
    }
  },
  methods: {
    getAllCategories() {
      category.all().then((response) => {
        this.categories = response.data;
      })
    },
    addCategory() {
      this.validate().then(() => {
          this.postCategoryHere();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    askForDeleteCategory(category_id) {
      this.swal({
        // title: 'Are you sure?',
        text: "Delete the Category?",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#428aff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: true
      }).then(() => {
        this.deleteCategory(category_id);
      })
    },
    deleteCategory(category_id) {
      category.deleteCategory(category_id)
        .then((response) => {
          this.getAllCategories();
        })
        .catch((error) => {
          console.log(error.response);
        })
    },
    postCategoryHere() {
      category.postCategory(this.title)
        .then((response) => {
          if (response.status == 200) {
            this.getAllCategories();
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
    },
    validate() {
      return this.$validator.validateAll();
    }
  }
}
</script>

<style lang="scss">
.category-page {

    .cat-title {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .cat-body {
        padding: 1rem;
    }

    .category-items {
        max-width: 200px;
        width: 100%;
        padding-bottom: 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .add-category {
        border-top: solid 1px #ddd;
        padding: 1rem;
    }

}
</style>
