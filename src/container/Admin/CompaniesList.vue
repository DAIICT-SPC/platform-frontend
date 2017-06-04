<template>
	<div class="company-wise-listing box">

		<div class="company-wise head">
			<h2 class="title">Companies Wise Listing</h2>
		</div>

		<div class="companywise-body">
			<div class="one-company" v-for="company in companies">
				<span class="text title is-4">{{company}}</span> <a class="button is-success is-outlined a-tag">Allow</a>
			</div>

		</div>
	</div>
</template>

<script>
export default{
	name: 'company-wise-listing',
	data(){
		return{
			companies:['DLF', 'Amazon', 'Delloit', 'Endurance', 'RTCamp', 'Qualcomm', 'WhitePanda',
			'Cashbasket', 'Sprinkler']
		}
	},

	methods: {
		redirect: function(){
			this.$router.push({ name: 'placement-tiles' });
		}
	}
}
</script>

<style lang="scss">
.company-wise-listing {

	max-width: 450px;

	.company-wise {
		padding: 1rem;
		border-bottom: solid 1px #ddd;
	}

		.companywise-body {
			padding: 1.5rem;
		}

		.one-company {
			width: 90%;
			padding: 0.5rem;
			border-bottom: solid 1px #ddd;
			.text {
				padding-left: 5px;
			}
		}

		.a-tag {
			float: right;
		}

}
</style>
