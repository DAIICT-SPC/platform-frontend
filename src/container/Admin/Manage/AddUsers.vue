<template lang="html">
	<div class="add-users">

			<div class="users-title">
				<h2 class="title">Users</h2>
			</div>

			<div class="add-users">

				<div class="file">
					<label class="label">File Upload</label>
					<div class="field has-addons">
						<input v-validate="'required'" data-vv-delay="2000" name="filename" type="file"
						class="inputfile inputfile-2" id="file" @change="processFile($event)">
						<label for="file"><span id="filename">{{filename}}</span></label>
						<div class="notification is-danger" v-show="errors.has('filename')">
							<span>{{ errors.first('filename') }}</span>
						</div>
						<p class="control">
							<a class="button is-success" @click="addUsers"> Add </a>
						</p>
					</div>

				</div>

				<div class="single-entry">
					<label class="label">Single Entry</label>
					<div class="field has-addons">
  				<div class="control">
    			<input class="input" type="text" placeholder="Add a user">
  				</div>
  				<div class="control">
    			<a class="button is-info" @click="validateAndAddSingleEntry">
      		Add User
    			</a>
  				</div>
					</div>
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
    processFile( event ) {
      this.filename = event.target.files[ 0 ].name
    },

    addUsers() {
      admin.activationViaFileUpload( this.filename, this.role )
        .then( ( response ) => {
          console.log( response );
        } )
        .catch( ( error ) => {
          console.log( error.response );
        } )
    },

    validateAndAddSingleEntry() {

    }
  }
}
</script>

<style lang="scss">
.add-users {

    .users-title {
        padding: 1rem;
        border-bottom: solid 1px #ddd;
    }

    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        z-index: -1;
        margin-top: 10px;
    }

    .inputfile + label {

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

    }
    .no-js .inputfile + label {
        display: none;
    }
    .inputfile.has-focus + label,
    .inputfile:focus + label {
        border-color: #00d1b2;
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
    .inputfile-2 + label:hover,
    .inputfile-2.has-focus + label,
    .inputfile-2:focus + label {
        border-color: #00d1b2;
    }

    .add-users {
        padding: 1rem;
    }

    .single-entry {
        margin-top: 0.5rem;
    }

}
</style>
