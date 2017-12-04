<template lang="html">
	<div class="add-users">
		<div class="users box">

			<div class="users-title">
				<h2 class="title">Users</h2>
			</div>

			<div class="field has-addons">
				<input v-validate="'required'" name="filename" type="file" class="inputfile inputfile-2" id="file"
				@change="processFile($event)">
				<label for="file"><span id="filename">{{filename}}</span></label>
				<div class="notification is-danger" v-show="errors.has('filename')">
					<span>{{ errors.first('filename') }}</span>
				</div>
				<p class="control">
					<a class="button is-success" @click="addUsers"> Add </a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import admin from '@/api/admin';
export default {
	name: 'add-users',
	data() {
		return {
			filename: 'Choose a file..',
			role: 'student'
		};
	},
	methods: {
		processFile(event) {
			this.filename = event.target.files[0].name
		},
		addUsers() {
			admin.activationViaFileUpload(this.filename, this.role)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error.response);
			})
		}
	}
}
</script>

<style lang="scss">
.add-users {

	.field.has-addons {
		padding: 1rem;
	}

	.users-title {
		border-bottom: solid 1px #ddd;
	}

	.inputfile {
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;

		z-index: -1;
		margin-top:10px;
	}
	.inputfile + label {

		/* 20px */
		width: 50%;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		display: inline-block;
		overflow: hidden;
		padding-left: 0.75em;
		padding-right: 0.75em;
		border: 1px solid #dbdbdb;
		height: 2.285em;
		box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
		line-height: 1.5rem;
		border-radius: 3px;
		padding-top: 0.3em;

		/* 10px 20px */
	}
	.no-js .inputfile + label {
		display: none;
	}
	.inputfile:focus + label,
	.inputfile.has-focus + label {
		border-color: #00d1b2;
	}
	.inputfile + label * {
		/* pointer-events: none; */
		/* in case of FastClick lib use */
	}
	.inputfile + label svg {
		width: 1em;
		height: 1em;
		line-height: 1.5rem;
		vertical-align: middle;
		margin-top: -0.25em;
		/* 4px */
		margin-right: 0.25em;
		/* 4px */
	}
	.inputfile-2 + label {
		border: 1px solid #dbdbdb;
	}
	.inputfile-2:focus + label,
	.inputfile-2.has-focus + label,
	.inputfile-2 + label:hover {
		border-color: #00d1b2;
	}

}
</style>
