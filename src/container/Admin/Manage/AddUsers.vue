<template lang="html">
	<div class="add-users">

			<div class="users-title">
				<h2 class="title">Users</h2>
			</div>

			<div class="add-users">

				<form id="file-form" class="file" enctype="multipart/form-data">
					<label class="label">File Upload</label>
					<div class="field has-addons">
						<input v-validate="'required'" data-vv-delay="2000" name="filename" type="file"
						:class="{ 'inputfile': true, 'is-danger': errors.has('filename') }"
						id="file" @change="processFile($event)">
						<!-- <input type="file" id="file" name="filename"
						@change="filesChange($event.target.files[ 0 ].name, $event.target.files[0]);"> -->
						<label for="file"><span id="filename">{{filename}}</span></label>
						<p class="control">
							<a class="button is-success" @click="validateAndAddUsersViaFile"> Add </a>
						</p>
					</div>

				</form>

				<div class="single-entry">
					<div class="field has-addons">
						<div class="left">
							<label class="label">Single Entry</label>
							<div class="field has-addons">
		  					<div class="control">
		    					<input v-validate="'required|email'" v-model="emailSingle" type="text"
									:class="{ 'input': true, 'is-danger': errors.has('emailSingle') }"
									placeholder="Add a user" name="emailSingle">
		  					</div>
							</div>
						</div>
						<div class="right">
							<RoleDropdown></RoleDropdown>
						</div>
							<a class="button is-info" @click="validateAndAddSingleEntry">
								Add User
							</a>
				</div>

				</div>
			</div>

	</div>
</template>

<script>
import admin from '@/api/admin';
import RoleDropdown from '@/components/Admin/RoleDropdown';
export default {
  name: 'add-users',
  created() {
    this.$bus.$on( 'role-change', ( data ) => {
      this.roleSingle = data.role;
    } )
  },
  data() {
    return {
      filename: 'Choose a file..',
      file: null,
      role: 'student',
      name: null,
      roleSingle: '',
      emailSingle: ''
    };
  },
  methods: {
    processFile( event ) {
      this.filename = event.target.files[ 0 ].name;
      this.file = event.target.files[ 0 ];
    },

    validateAndAddUsersViaFile() {
      this.$validator.validateAll( {
        'filename': this.file
      } ).then( ( result ) => {
        if ( result ) {
          this.addUsersViaFile();
        } else {
          this.$toasted.error( "Please select a valid file first!", {
            theme: "outline",
            position: "bottom-center",
            duration: 3000
          } );
        }
      } );
    },

    addUsersViaFile() {
      let data = new FormData();
      data.append( 'csv', this.file );
      data.append( 'role', this.role );
      admin.activationViaFileUpload( data )
        .then( ( response ) => {
          console.log( response );
        } )
        .catch( ( error ) => {
          console.log( error.response );
        } )
    },

    validateAndAddSingleEntry() {
      this.$validator.validateAll( {
        'emailSingle': this.emailSingle,
      } ).then( ( result ) => {
        if ( this.roleSingle == '' ) {
          this.fillErrorMessage();
        } else {
          if ( result ) {
            this.singleEntry();
          } else {
            this.fillErrorMessage();
          }
        }
      } );
    },

    singleEntry() {
      admin.singleEntry( this.emailSingle, this.roleSingle )
        .then( ( response ) => {
          if ( response.data == "" ) {
            this.$toasted.success( "User creation success!", {
              theme: "outline",
              position: "top-center",
              duration: 3000
            } );
          }
        } )
        .catch( ( error ) => {
          console.log( error.response );
        } )
    },

    fillErrorMessage() {
      this.$toasted.error( "Please fill all the details first!", {
        theme: "outline",
        position: "bottom-center",
        duration: 3000
      } );
    }
  },

  components: {
    RoleDropdown
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
        .left {
            margin-bottom: 0.5rem;
            margin-right: 1rem;
        }
        .button.is-info {
            margin-top: 2rem;
            margin-left: 1rem;
        }
    }

}
</style>
