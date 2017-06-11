<template lang="html">
  <div>
    <span class="select is-fullwidth">
      <select v-validate="'required|not_in:null'" v-model="education_id"
      @change="educationChange" name="education">
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
import education from '@/api/education';
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';

export default {
  name: 'education-dropdown',
  props: {
    cat_id: {
    },
    placement_id: {
    }
  },
  created() {
    this.education = this.ed_arr;
    // this.callEducation();
    this.education_id = this.ed_id;
  },
  beforeUpdate() {
    this.$bus.$emit('education-change', { id: this.education_id });
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
    },
    getUserId() {
      return Auth.getUserToken();
    }
    // callEducation() {
    //   education.all().then((response) => {
    //     this.education = response.data;
    //   })
    // }
  }
}
</script>
