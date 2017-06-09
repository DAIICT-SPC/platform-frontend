<template>
  <div>
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="category_id" @change="categoryChange()" name="category" >
        <option value=null>Select dropdown</option>
        <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
      </select>
    </span>
  </div>
  <!-- <div class="placementSeason-component">
		<div class="main">
			<span class="select is-fullwidth">
				<select v-validate="'required|not_in:null'" v-model="seasonId" @change="placementseasonChange()" name="placement-select">
					<option value=null>Select Dropdown</option>
					<option v-for="season in seasons" :value="season.id">{{season.title}}</option>
				</select>
			</span>
		</div>
		<div v-if="!showData">
			<h1>No Data found</h1>
		</div>
	</div> -->
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
      this.$bus.$emit('category-change1', { category_id: this.category_id });
    }
  }
}
</script>
