<template>

	<div class="placement-criteria">

		<div class="placement-header-section">
			<h2 class="title placement-header">PLACEMENT CRITERIA</h2>
			<span class="tag-header">
				<span class="tag is-success category">category</span>
			</span>
		</div>


		<div class="placement-body">
			<div class="field">
				<label class="label">Education</label>
				<p class="control">
					<education></education>
				</p>
			</div>

			<div class="field">
				<label class="label">CPI Required</label>
				<p class="control">
					<input type="number" name="cpi" placeholder="Enter CPI" class="input" v-model="placementDrive.cpi">
				</p>
			</div>

			<div class="field is-grouped">
				<p class="control">
					<button class="button is-primary">Save And New</button>
					<button class="button is-primary">Next</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import EducationDropdown from '@/components/EducationDropdown'

export default {
	name: 'placement-criteria',

	components:{
		Datepicker,
		'education': EducationDropdown,
	},

	created(){
		this.$bus.$on('education-change', (response) => {
			this.placementDrive.educationId = response.id;
		});
	},

	data() {
		return {
			placementDrive: {
				educationId: '',
				cpi: null
			}
		}
	}
}
</script>

<style lang="scss">
.placement-criteria {

	.title.placement-header {
		border-bottom: solid 1px #ddd;
		margin-bottom: 0;
		padding: 1rem;
	}

	.placement-header-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tag-header {
		padding: 1rem;
	}

	.placement-body {
		padding: 1rem;
	}
}
</style>
