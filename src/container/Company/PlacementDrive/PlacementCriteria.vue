<template>

	<div class="placement-criteria">

		<div class="placement-header-section">
			<h2 class="title placement-header">PLACEMENT CRITERIA</h2>
			<span class="tag-header">
				<span class="tag is-success category">{{cat_name}}</span>
			</span>
		</div>

		<div class="placement-body">
			<div class="field">
				<label class="label">Education</label>
				<p class="control">
					<span class="select is-fullwidth">
						<!-- <education :placement_id="placement_id" :category_id="category_id"></education> -->
						<select v-validate="'required|not_in:null'" v-model="education_id" name="education">
							<option value=null>Select dropdown</option>
							<option v-for="ed in ed_arr" :value="ed.id">{{ed.name}}</option>
						</select>
					</span>
				</p>
			</div>

			<div class="field">
				<label class="label">CPI Required</label>
				<p class="control">
					<input v-model="cpi_required" type="number" name="cpi" placeholder="Enter CPI" class="input">
				</p>
			</div>

			<div class="field is-grouped">
				<p class="control">
					<button class="button is-primary" @click="sendCriteria">Save And New</button>
					<button class="button is-primary" @click="changeCategory">Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Auth from '@/packages/auth/Auth';
import company from '@/api/company';
import Datepicker from 'vue-bulma-datepicker';
// import EducationNormalModal from '@/components/EducationNormalModal';

export default {
	name: 'placement-criteria',
	components:{
		Datepicker,
		// 'education': EducationNormalModal,
	},
	created() {
		this.category_id = window.localStorage.getItem('category_id');
		this.placement_id = this.$route.params.placement_id;
		this.getCategoriesForPlacementCriteria(this.category_id);
		if(this.$route.path == '/') {
			this.$router.push({name:'placement-primary'})
		}
		this.$bus.$on('education-change', (response) => {
			this.education_id = response.id;
		});
	},
	data() {
		return {
			stream: '',
			placement_id: null,
			cat_id: null,
			cat_name: '',
			cat_ref_id: null,
			education_id: null,
			cpi_required: null,
			ed_arr: [],
			category_id: null,
		}
	},
	methods: {
		getCategoriesForPlacementCriteria(category_id) {
			company.getCategoriesForPlacementCriteria(this.getUserId(), this.placement_id, category_id)
			.then((response) => {
				if(response.data == 'Done!') {
					this.$router.push({ name: 'company-home' });
				}
				this.cat_ref_id = response.data[0].id;
				this.cat_name = response.data[0].name;
				this.setId();

			})
			.catch((error) => {
				console.log(error);
			})
		},
		setId() {
			this.cat_id = this.cat_ref_id;
			this.getEducationForPlacementCriteria(this.cat_id);
		},
		getEducationForPlacementCriteria(category_id) {
			company.getEducationForPlacementCriteria(this.getUserId(), this.placement_id, category_id)
			.then((response) => {
				if(response.data == 'Done with Educations!') {
					this.$router.push({ name: 'company-home' });
				}
				this.ed_arr = response.data;
			})
			.catch((error) => {
				console.log(error);
			})
		},
		sendCriteria() {
			company.setPlacementCriteria(this.getUserId(), this.placement_id, this.education_id,
			this.cat_id, this.cpi_required)
			.then((response) => {
				Auth.setCriteriaId(0);
				this.getCategoriesForPlacementCriteria();
			})
			.catch((error) => {
				console.log(error);
			})
		},
		changeCategory() {
			this.cat_id = this.cat_ref_id;
			Auth.setCriteriaId(this.cat_id);
			this.getCategoriesForPlacementCriteria(this.cat_ref_id);
		},
		getUserId() {
			return Auth.getUserToken();
		},
		getCriteriaId() {
			return Auth.getCriteriaId();
		}
	},

}
</script>

<style lang="scss">
.placement-criteria {

	.title.placement-header {
		margin-bottom: 0;
		padding: 1rem;
	}

	.placement-header-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #ddd;
	}

	.tag-header {
		padding: 1rem;
	}

	.placement-body {
		padding: 1rem;
	}
}
</style>
