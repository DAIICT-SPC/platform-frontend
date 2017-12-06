<template lang="html">
	<div class="company-selection-rounds">
		<div class="box">

			<div v-if="showData">
				<div class="selection-header">
					<h3 class="title">Students <span class="subtitle">(Remaining)</span></h3>
					<button class="button is-success" @click="showModal = true">View Full-List</button>
				</div>

				<div v-for="studentData in remainingStudents">
					<div class="selection-body" v-if="studentData.user">
						<div class="part1">
							<input v-model="selectedStudents" :value="studentData.enroll_no" type="checkbox" name="checkbox" class="checkbox">
							<span class="enroll">{{ studentData.enroll_no }}</span>
							<span class="name">{{ studentData.user.name }}</span>
							<span class="category">{{ studentData.category.name }}</span>
						</div>
						<div class="part2 student-preview">
							<StudentPreviewModal :key="studentData.enroll_no" :studentData="studentData"></StudentPreviewModal>
						</div>
					</div>
				</div>

				<div class="selection-checkbox">
					<input type="checkbox" class="checkbox" v-model="selectAll" />
					<span class="text">Select All</span>
				</div>

				<div class="selection-footer">
					<router-link :to="{ name: 'view-placement-detail', params: { placement_id: placement_id } }" class="button is-primary back-button">Back</router-link>
					<a class="button is-primary applicant-button" @click="moveStudentsToNextRound">Move to next round</a>
				</div>
			</div>

			<div v-if="!showData && !allStudents && !offerStudents">
				<h3 class="title no-data">No Student has applied yet!</h3>
			</div>

			<div class="allow" v-if="allStudents">
				<h3 class="title no-data">All Students moved to next Round</h3>
				<button @click="showModal = true" class="button is-success">View Full-List</button>
			</div>

			<div class="allow" v-if="offerStudents">
				<h3 class="title no-data">All Students have been moved to Offer Layer</h3>
				<button @click="showModal = true" class="button is-success">View Full-List</button>
			</div>

			<RoundFullListModal @close="showModal = false" v-if="showModal"></RoundFullListModal>

		</div>
	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import RoundFullListModal from '@/components/Company/RoundFullListModal';
import StudentPreviewModal from '@/components/Company/StudentPreviewModal';

export default {
  name: 'company-selection-rounds',

  created() {
    this.placement_id = this.$route.params.placement_id;
    this.season_id = this.$route.params.season_id;
    this.round_id = this.$route.params.round_id;
    this.getRemainingStudents()
  },

  data() {
    return {
      placement_id: null,
      season_id: null,
      round_id: null,
      showData: true,
      remainingStudents: [],
      selectedStudents: [],
      allStudents: false,
      offerStudents: false,
      showModal: false,
      showViewModal: false
    };
  },
  methods: {
    getRemainingStudents() {
      company.getRemainingStudentsRoundwise( this.getUserId(), this.placement_id, this.round_id )
        .then( ( response ) => {
          // console.log(response);
          if ( response.data == 'None has applied yet!' ) {
            this.showData = false;
          } else if ( response.data == 'All Students moved to next Round!' ) {
            this.showData = false;
            this.allStudents = true;
          }
          // All Students of this round moved to next Round!
          else if ( response.data == 'All Students of this round moved to next Round!' ) {
            this.showData = false;
            this.allStudents = true;
          }
          // All Students in Last Round got Offer!
          else if ( response.data == 'All Students in Last Round got Offer!' ) {
            this.showData = false;
            this.allStudents = false;
            this.offerStudents = true;
          } else if ( response.data == 'All Students of this round moved to Offer Layer!' ) {
            this.showData = false;
            this.allStudents = false;
            this.offerStudents = true;
          } else {
            this.showData = true;
            this.allStudents = false;
            this.remainingStudents = response.data;
          }
        } )
        .catch( ( error ) => {
          console.log( error );
        } )
    },
    moveStudentsToNextRound() {
      if ( this.selectedStudents.length == 0 ) {
        let toast = this.$toasted.error( "No student Selected.", {
          theme: "outline",
          position: "top-center",
          duration: 3000
        } );
      } else {
        company.postCompanyMoveToNextRound( this.getUserId(), this.placement_id, this.selectedStudents, this.round_id )
          .then( ( response ) => {
            if ( response.status == 200 ) {
              if ( response.data[ 0 ].package == 0 ) {
                let toast = this.$toasted.success( response.data.length + " student moved to Offer Layer", {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                } );
              } else if ( response.data.length == 1 ) {
                let toast = this.$toasted.success( response.data.length + " student moved to round no " + response.data[ 0 ].round_no, {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                } );
              } else {
                let toast = this.$toasted.success( response.data.length + " students moved to round no " + response.data[ 0 ].round_no, {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                } );
              }
              this.getRemainingStudents();
            }
          } )
          .catch( ( error ) => {
            console.log( error );
          } )
      }
    },
    getUserId() {
      // getRemainingStudentsInApplication
      return Auth.getUserToken();
    }
  },
  computed: {
    selectAll: {
      get: function () {
        return this.remainingStudents ? this.selectedStudents.length == this.remainingStudents.length : false;
      },
      set: function ( value ) {
        var selectedStudents = [];
        if ( value ) {
          this.remainingStudents.forEach( ( rstudent ) => {
            selectedStudents.push( rstudent.enroll_no );
          } )
        }
        this.selectedStudents = selectedStudents;
      }
    }
  },
  components: {
    RoundFullListModal,
    StudentPreviewModal
  },
}
</script>

<style lang="scss">
.company-selection-rounds {

    .box {
        padding: 1rem;
        margin-top: 1.5rem;
        margin-bottom: 2rem;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
    }

    .allow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .button {
            margin-right: 1rem;
        }
    }

    .title {
        margin-bottom: 0;
    }

    .selection-header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        margin: auto;
        border-bottom: solid 1px #ddd;
        margin-bottom: 1rem;
    }

    .checkbox {
        margin-right: 0.5rem;
    }

    .enroll {
        margin-right: 0.5rem;
    }

    .name {
        margin-right: 0.5rem;
    }

    .modal-card-title {
        padding-top: 5px;
    }

    .selection-body {
        padding: 0.5rem 0.5rem 0.5rem 1.6rem;
        margin-left: 1rem;
        padding-right: 2.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }

    .view-profile {
        float: right;
    }

    .selection-checkbox {
        padding: 0.5rem;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        border-top: solid 1px #ddd;
    }

    .selection-footer {
        border-top: solid 1px #ddd;
        padding: 1rem;
        margin-top: 1rem;
    }

}
</style>
