<template>
  <div class="myprofile-page">

    <div class="category box">

      <div class="cat-title">
        <h2 class="title">Category</h2>
      </div>

      <div class="cat-body">
        <ul class="category-items">
          <li v-for="category,index in categories">{{index+1}}) {{ category.name }} <i class="fa fa-trash" aria-hidden="true"></i></li>
        </ul>
      </div>


      <div class="add-category">
        <div >
          <div class="field has-addons">
            <p class="control">
              <input v-validate="'required'" v-model="title" :class="{'input': true, 'is-danger': errors.has('cat') }" name="cat" type="text" placeholder="Enter New Category">
            </p>
            <p class="control">
              <a class="button is-success" @click="addCategory"> Add Category </a>
            </p>
          </div>
          <!-- <div class="notification is-danger" v-show="errors.has('cat')">
            {{errors.first('cat')}}
          </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import category from '@/api/category'

export default{
  name: 'myprofile',
  created() {
    console.log("created");
    category.all().then((response) => {
      console.log(response);
      this.categories = response.data;
    })
  },
  beforeUpdate() {
    category.all().then((response) => {
      this.categories = response.data;
    })
  },
  data() {
    return{
      categories: [ ],
      title: ''
    }
  },
  methods: {
    addCategory() {
      this.validate().then(() => {
        this.postCategoryHere();
      })
      .catch((error) => {
        console.log(error);
      })
    },
    postCategoryHere() {
      category.postCategory(this.title)
      .then((response) => {
        if(response.status == 200){
          alert('Category Added Successfully');
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
.myprofile-page{

  .cat-title {
    border-bottom: solid 1px #ddd;
  }

  .cat-body {
    padding: 1.5rem;
  }

  li {
    padding-bottom: 0.2rem;
  }

  .field.has-addons {
    padding-left: 1rem;
  }

  .add-category {
    border-top: solid 1px #ddd;
    padding-top: 1rem;
  }

  // .notification.is-danger {
  //   max-width: 250px;
  //   max-height: 36px;
  //   padding-top: 7px;
  // }

}
</style>
