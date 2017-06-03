<template lang="html">
  <div>
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="education_id" @change="educationChange()" name="education">
        <option value=null>Select dropdown</option>
        <option v-for="ed in education" :value="ed.id">{{ed.name}}</option>
      </select>
    </span>
    <div class="help is-danger" v-show="errors.has('education')">
      {{errors.first('education')}}
    </div>
  </div>
</template>

<script>
import education from '@/api/education'

export default {
  name: 'education-dropdown',
  created() {
    education.all().then((response) => {
      this.education = response.data;
    })
  },
  data() {
    return {
      education_id: null,
      education: []
    };
  },
  methods: {
    educationChange() {
      this.$bus.$emit('education-change', { id: this.education_id });
    }
  }
}
</script>
