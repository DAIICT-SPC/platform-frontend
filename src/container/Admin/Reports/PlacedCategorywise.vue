<template>
	<div class="placed-students">

		<div class="columns section-header">
			<div class="column">
				<span class="title is-4">EnrollNo</span>
			</div>
			<div class="column is-4">
				<span class="title is-4">Name</span>
			</div>
			<div class="column">
				<span class="title is-4">Category</span>
			</div>
			<div class="column">
				<span class="title is-4">Package</span>
			</div>
			<div class="column is-4">
				<span class="title is-4">Company</span>
			</div>
		</div>

		<div class="columns section-body">
			<div class="column">
				<span class="texts">201612105</span>
			</div>
			<div class="column is-4">
				<span class="texts">Sagar Makhija Gurmukh</span>
			</div>
			<div class="column">
				<span class="texts">Msc(IT)</span>
			</div>
			<div class="column">
				<span class="texts">500000</span>
			</div>
			<div class="column is-4">
				<span class="texts">XYZ Company Pvt. Ltd.</span>
			</div>
		</div>

		<div class="columns section-body">
			<div class="column">
				<span class="texts">201612105</span>
			</div>
			<div class="column is-4">
				<span class="texts">Sagar Makhija Gurmukh</span>
			</div>
			<div class="column">
				<span class="texts">Msc(IT)</span>
			</div>
			<div class="column">
				<span class="texts">500000</span>
			</div>
			<div class="column is-4">
				<span class="texts">XYZ Company Pvt. Ltd.</span>
			</div>
		</div>

		<div class="columns section-body">
			<div class="column">
				<span class="texts">201612105</span>
			</div>
			<div class="column is-4">
				<span class="texts">Sagar Makhija Gurmukh</span>
			</div>
			<div class="column">
				<span class="texts">Msc(IT)</span>
			</div>
			<div class="column">
				<span class="texts">500000</span>
			</div>
			<div class="column is-4">
				<span class="texts">XYZ Company Pvt. Ltd.</span>
			</div>
		</div>

		<div class="columns section-body">
			<div class="column">
				<span class="texts">201612105</span>
			</div>
			<div class="column is-4">
				<span class="texts">Sagar Makhija Gurmukh</span>
			</div>
			<div class="column">
				<span class="texts">Msc(IT)</span>
			</div>
			<div class="column">
				<span class="texts">50000000</span>
			</div>
			<div class="column is-4">
				<span class="texts">XYZ Company Pvt. Ltd.</span>
			</div>
		</div>

		<!-- <div class="section-body" v-for="student in students">
			<span class="title is-5">{{ student.id }}</span>
			<span>{{ student.name }}</span>
		</div> -->

	</div>
</template>

<script>
	export default{
		name: 'placed-students',
		data(){
			return{
				students: [ ]
			}
		}
	}
</script>

<style lang="scss">
	.placed-students {
		margin-bottom: 2rem;
		padding: 1rem;
		padding-top: 0;

		.section-header {
			padding: 1rem;
			border-bottom: solid 1px #ddd;
			padding-bottom: 0;
		}

		.columns {
			margin: 0;
		}

		.section-body{
			margin-left: 1rem;
		}
	}
</style>
