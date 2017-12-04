<template lang="html">
	<div class="company-application-selection-rounds">
		<div class="box">

			<div v-if="showData">
				<div class="selection-header">
					<h3 class="title">Applicants <span class="subtitle">(Remaining)</span></h3>
					<button @click="showModal = true" class="button is-success">View Full-List</button>
				</div>

				<div v-for="studentData in remainingStudents">
					<div class="company-application-selection-body" v-if="studentData.user">
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

			<div v-if="!showData && !allStudents && showStudentNumericData">
				<h3 class="title no-data">No Student has applied yet!</h3>
			</div>
			<div class="allow" v-if="allStudents">
				<h3 class="title no-data">All Students moved to next Round</h3>
				<button @click="showModal = true" class="button is-success">View Full-List</button>
				<ApplicationFullList @close="showModal = false" v-if="showModal == true"></ApplicationFullList>
			</div>

			<div v-if="!showData && !allStudents && !showStudentNumericData">
				<h3 class="title no-data" v-if="studentLength">{{studentLength}} students have applied.</h3>
				<h3 class="title no-data" v-if="!studentLength">No students have applied.</h3>
			</div>
		</div>

	  <ApplicationFullList @close="showModal = false" v-if="showModal == true"></ApplicationFullList>

	</div>
</template>

<script>
import company from '@/api/company';
import Auth from '@/packages/auth/Auth';
import ApplicationFullList from '@/components/Company/ApplicationFullList';
import StudentPreviewModal from '@/components/Company/StudentPreviewModal';

export default {
  name: 'company-application-selection-rounds',
  components: {
    ApplicationFullList,
    StudentPreviewModal
  },
  computed: {
    selectAll: {
      get: function() {
        return this.remainingStudents ? this.selectedStudents.length == this.remainingStudents.length : false;
      },
      set: function(value) {
        var selectedStudents = [];
        if (value) {
          this.remainingStudents.forEach((rstudent) => {
            selectedStudents.push(rstudent.enroll_no);
          })
        }
        this.selectedStudents = selectedStudents;
      }
    }
  },
  created() {
    this.placement_id = this.$route.params.placement_id;
    this.isStudentDataAllowed();
  },
  data() {
    return {
      placement_id: null,
      remainingStudents: [],
      showData: false,
      selectedStudents: [],
      allStudents: false,
      showModal: false,
      modalValue: '',
      showViewModal: false,
      showStudentNumericData: false,
      studentLength: false
    };
  },
  methods: {
    isStudentDataAllowed() {
      company.isStudentDataAllowed(this.getUserId(), this.placement_id)
        .then((response) => {
          if (response.data.status == 'false') {
            //show numeric values
            this.showData = false;
            this.showStudentNumericData = false;
            this.getRemainingStudents();
          } else {
            this.showData = false;
            this.showStudentNumericData = true;
            //show the data
            this.getRemainingStudents();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getRemainingStudents() {
      company.getRemainingStudentsInApplication(this.getUserId(), this.placement_id)
        .then((response) => {
          if (this.showStudentNumericData == false) {
            if (response.data == 'None has applied yet!') {
              this.showData = false;
            } else {
              this.studentLength = response.data.length;
            }
          } else {
            if (response.data == 'None has applied yet!') {
              this.showData = false;
            } else if (response.data == 'All Students move to Rounds') {
              this.showData = false;
              this.allStudents = true;
            } else {
              this.showData = true;
              this.remainingStudents = response.data;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    moveStudentsToNextRound() {
      if (this.selectedStudents.length == 0) {
        let toast = this.$toasted.error("No student Selected", {
          theme: "outline",
          position: "top-center",
          duration: 3000
        });
      } else {
        company.postCompanyMoveToFirstRound(this.getUserId(), this.placement_id, this.selectedStudents)
          .then((response) => {
            if (response.status == 200) {
              if (response.data.length == 1) {
                let toast = this.$toasted.success(response.data.length + " student moved to round no " + response.data[0].round_no, {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                });
              } else {
                let toast = this.$toasted.success(response.data.length + " students moved to round no " + response.data[0].round_no, {
                  theme: "outline",
                  position: "top-center",
                  duration: 3000
                });
              }
              this.getRemainingStudents();
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }

    },
    getUserId() {
      return Auth.getUserToken();
    }
  },
}
</script>

<style lang="scss">
.company-application-selection-rounds {

    .box {
        margin-bottom: 2rem;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
				padding: 0;
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
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
				align-items: center;
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

    .company-application-selection-body {
        padding: 0.5rem;
        margin-left: 1rem;
        padding-left: 1.5rem;
        padding-right: 2.2rem;
        display: flex;
        justify-content: space-between;
        margin: auto;
    }

    .view-profile {
        float: right;
    }

    .selection-checkbox {
        padding: 1rem 0.5rem 0.5rem;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 0.5rem;
        border-top: solid 1px #ddd;
    }

    .selection-footer {
        border-top: solid 1px #ddd;
        padding: 1.5rem;
        margin-top: 1rem;
    }

    .no-data {
        padding: 1rem;
    }

}
</style>
