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
import admin from '@/api/admin'
import Auth from '@/packages/auth/Auth'

export default {
  name: 'education-dropdown',
  props: {
    education_id_rec: {
      required: true,
    },
    category_id: {
      required: true,
    }
  },
  created() {
    console.log(this.category_id);
    this.education_id = this.education_id_rec;
    // this.callEducation();
    this.placement_id = this.$route.params.placement_id;
    this.getEducation();

  },
  beforeUpdate() {
    this.$bus.$emit('education-change', { id: this.education_id });
  },
  data() {
    return {
      education_id: null,
      education: [],
      show: true
    };
  },
  methods: {
    getEducation() {
			admin.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, this.category_id)
			.then((response) => {
        if(response.data == 'Done with Educations!') {
          this.$bus.$emit('education-ended');
        }
				this.education = response.data;
				this.ed_id = this.education[0].id;
			})
			.catch((error) => {
				console.log(error);
			})
		},
    getUserId() {
      return Auth.getUserToken();
    },
    educationChange() {
      this.$bus.$emit('education-change', { id: this.education_id });
    },
    callEducation() {
      education.all().then((response) => {
        this.education = response.data;
      })
    }
  }
}
</script>
