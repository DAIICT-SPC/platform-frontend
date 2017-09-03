import HTTP from '@/packages/http';

export default {

  getUserDetails(user_id) {
    // /users/3/company/show
    let url = '/users/' + user_id + '/company/show'
    return HTTP.get(url);
  },

  postUserDetails(user_id, name, company_name, address,
    contact_no, company_expertise, company_url) {
      let url = '/users/' + user_id + '/company/update'
      return HTTP.patch(url, {
        name: name,
        company_name: company_name,
        address: address,
        contact_no: contact_no,
        company_expertise: company_expertise,
        company_url: company_url
      });
    },

    // /users/22/company/updatePersonal
    patchCompanyPassword(user_id, password) {
        let url = '/users/' + user_id + '/company/updatePersonal'
        return HTTP.patch(url, {
          password: password
        });
      },

      patchCompanyAltEmail(user_id, alternate_email) {
          let url = '/users/' + user_id + '/company/updatePersonal'
          return HTTP.patch(url, {
            alternate_email: alternate_email
          });
        },

    getCompanyDashboard(user_id) {
      // /users / {user_id} / company /placementPrimaryAll
      let url = '/users/' + user_id + '/company/placementPrimaryAll';
      return HTTP.get(url);
    },

    placementPrimary(user_id, job_title, job_description, last_date_for_registration, location, no_of_students,
      packages, job_type_id, placement_season_id, start_date, end_date) {
        console.log(packages);
        let url = '/users/' + user_id + '/company/createPlacement';
        return HTTP.post(url, {
          job_title: job_title,
          job_description: job_description,
          last_date_for_registration: last_date_for_registration,
          location: location,
          no_of_students: no_of_students,
          package: packages,
          job_type_id: job_type_id,
          placement_season_id: placement_season_id,
          start_date: start_date,
          end_date: end_date
        });
      },

      selectCategory(user_id, placement_id, openFor_checkbox) {
        // api / users / {user_id} / company / {placement_id} / setOpenForDetails
        let url = '/users/' + user_id + '/company/' + placement_id + '/setOpenForDetails';
        return HTTP.post(url, {
          openFor_checkbox: openFor_checkbox
        });
      },

      getRoundNo(user_id, placement_id) {
        // /users/{user_id}/company/getRoundNumber/{placement_id}
        let url = '/users/' + user_id + '/company/getRoundNumber/' + placement_id;
        return HTTP.get(url);
      },

      selectionRounds(user_id, placement_id, round_no, round_name, round_description, date_of_round) {
        // api / users / {user_id} / company / {placement_id} / setSelectionRound
        let url = '/users/' + user_id + '/company/' + placement_id + '/setSelectionRound';
        return HTTP.post(url, {
          round_no: round_no,
          round_name: round_name,
          round_description: round_description,
          date_of_round: date_of_round
        });
      },

      //manage
      getDraftPlacements(user_id) {
        // /users/2/company/getDraftPlacements
        let url = '/users/' + user_id + '/company/getDraftPlacements';
        return HTTP.get(url);
      },

      startPlacement(user_id, placement_id) {
        /// users / {user_id} / company / {placement_id} / openRegistrationForPlacement
        let url='users/' + user_id + '/company/' + placement_id + '/openRegistrationForPlacement';
        return HTTP.post(url);
      },

      getCategoriesForPlacementCriteria(user_id, placement_id, category_id) {
        let url = '/users/' + user_id + '/company/remainingCategories/' + placement_id + '/' + category_id;
        return HTTP.get(url);
      },

      getEducationForPlacementCriteria(user_id, placement_id, category_id) {
        let url = '/users/' + user_id + '/company/remainingEducation/' + placement_id + '/' + category_id;
        return HTTP.get(url);
      },

      setPlacementCriteria(user_id, placement_id, education_id, category_id, cpi_required) {
        // / users / {user_id} / company / {placement_id} /setPlacementCriteria
        let url = '/users/' + user_id + '/company/' + placement_id + '/setPlacementCriteria';
        return HTTP.post(url, {
          education_id: education_id,
          category_id: category_id,
          cpi_required: cpi_required
        })
      },

      getPlacementSeasonsAvailable(user_id) {
        let url = '/users/' + user_id + '/company/showPlacementSeasonAvailable';
        return HTTP.get(url);
      },

      getPlacementDetails(user_id, placement_id) {
        // /users/2/company/6/showPlacementDetails/
        let url = '/users/' + user_id + '/company/' + placement_id + '/showPlacementDetails/';
        return HTTP.get(url);
      },

      updatePlacementDriveDescription(user_id, palcement_id, packages, no_of_students, job_title, location, job_description) {
        // /users/2/company/6/updatePlacementsPrimary
        let url = '/users/' + user_id + '/company/' + palcement_id + '/updatePlacementsPrimary';
        return HTTP.patch(url, {
          job_title: job_title,
          location: location,
          job_description: job_description,
          package: packages,
          no_of_students: no_of_students,
        });
      },

      // /users/{userid}/admin/{placement_id}/updateCriteria
      patchUpdateEligibilityCriteria(user_id, placement_id, education_id, category_id, cpi_required) {
        let url = '/users/'+ user_id +'/company/' + placement_id + '/updateCriteria'
        return HTTP.patch(url, {
          education_id: education_id,
          category_id: category_id,
          cpi_required: cpi_required
        });
      },

      deleteCriteria(user_id, placement_id, education_id, category_id) {
        // /users/id/company/deleteEducationCriteria/{placement_id}/{category_id}
        let url = '/users/' + user_id + '/company/deleteEducationCriteria/' + placement_id + '/' + category_id + '/' + education_id;
        return HTTP.delete(url);
      },

      deleteOpenFor(user_id, placement_id, category_id) {
        let url = '/users/' + user_id + '/company/deleteOpenFor/' + placement_id + '/' + category_id;
        return HTTP.delete(url);
      },

      getOpenFor(user_id, placement_id) {
        // api/users/{user_id}/company/getRemainingOpenFor/{placement_id}
        let url = '/users/'+ user_id +'/company/getRemainingOpenFor/' + placement_id;
        return HTTP.get(url);
      },

      // api/users/{user_id}/company/{placement_id}/updateOpenFor
      patchOpenForDetail(user_id, placement_id, categories){
        let url = '/users/'+ user_id +'/company/' + placement_id + '/updateOpenFor'
        return HTTP.patch(url, {
          update_open_for: categories,
        });
      },

      patchRoundDetails(user_id, placement_id, round_no, round_name, round_description) {
        // /users/id/company/updateSelectionRoundDetails/pid/rno
        let url = '/users/' + user_id + '/company/updateSelectionRoundDetails/' + placement_id + '/' + round_no;
        return HTTP.patch(url, {
          round_name: round_name,
          round_description: round_description
        })
      },

      deleteSelectionRound(user_id, placement_id, round_no) {
        let url = '/users/' + user_id + '/company/deleteSelectionRound/' + placement_id + '/' + round_no;
        return HTTP.delete(url);
      },

      //Selection Rounds
      getRemainingStudentsInApplication(user_id, placement_id) {
        // /users/1/company/remainingStudentsInApplication/1
        let url = '/users/' + user_id + '/company/remainingStudentsInApplication/' + placement_id;
        return HTTP.get(url);
      },

      // from application, move to next round
      postCompanyMoveToFirstRound(user_id, placement_id, arr) {
        // /users/1/admin/1/selectStudentsFromApplication
        let url = '/users/' + user_id + '/company/' + placement_id + '/selectStudentsFromApplication';
        return HTTP.post(url, {
          students_from_applications_checkbox: arr
        });
      },

      // application modal
      getApplicationList(user_id, placement_id) {
        // /users/id/admin/placementApplications/p_id
        let url = '/users/' + user_id + '/company/placementApplications/' + placement_id;
        return HTTP.get(url);
      },

      postDownloadResumes(user_id, checkbox) {
        let url = '/users/' + user_id + '/company/downloadResume';
        return HTTP.post(url, {
          checkbox: checkbox
        });
      },

      // get students from {round_id}
      getRemainingStudentsRoundwise(user_id, placement_id, round_id) {
        // /users/1/company/remainingStudentsRoundwise/{placementId}/{roundID}
        let url = '/users/' + user_id + '/company/remainingStudentsRoundwise/' + placement_id + '/' + round_id;
        return HTTP.get(url);
      },

      postCompanyMoveToNextRound(user_id, placement_id, arr, round_no) {
        // /users/1/company/{placementId}/selectStudentsRoundwise
        let url = '/users/' + user_id + '/company/' + placement_id + '/selectStudentsRoundwise/' + round_no;
        return HTTP.post(url, {
          student_roundwise: arr
        });
      },

      // / users / {user_id} / company / roundWisePlacementDetail /  {placement_id} / {round_no}
      getRoundwiseList(user_id, placement_id, round_no) {
        let url = '/users/' + user_id + '/company/roundWisePlacementDetail/' + placement_id + '/' + round_no;
        return HTTP.get(url);
      },

      getStudentsForOffer(user_id, placement_id) {
        // /users/1/company/remainingStudentsForOffer/1
        let url = '/users/' + user_id + '/company/remainingStudentsForOffer/' + placement_id;
        return HTTP.get(url);
      },

      getStudentsForOffer(user_id, placement_id) {
        // /users/1/company/remainingStudentsForOffer/1
        let url = '/users/' + user_id + '/company/remainingStudentsForOffer/' + placement_id;
        return HTTP.get(url);
      },

      postGiveOffer(user_id, placement_id, enroll_no, packageOffer) {
        // /users/1/company/{placement_id}/giveOffer
        let url = '/users/' + user_id + '/company/' + placement_id + '/giveOffer';
        return HTTP.post(url, {
          enroll_no: enroll_no,
          package: packageOffer
        });
      },

      getOfferRoundList(user_id, placement_id) {
        let url = '/users/' + user_id + '/company/getAllOfferLetter/' + placement_id;
        return HTTP.get(url);
      },

      isFeedbackGiven(user_id, placement_id) {
        let url = '/users/' + user_id + '/company/isFeedbackGiven/' + placement_id;
        return HTTP.get(url);
      },

      giveFeedback(user_id, placement_id, description, rating) {
        // /users/{user_id}/company/giveFeedback/{placement_id}
        let url = '/users/' + user_id + '/company/giveFeedback/' + placement_id;
        return HTTP.post(url, {
          description: description,
          rating: rating
        });
      },

      getStudentDetail(user_id, enroll_no) {
        // /users/3/company/studentDetail/201612105
        let url = '/users/' + user_id + '/company/studentDetail/' + enroll_no;
        return HTTP.get(url);
      },

      isStudentDataAllowed(user_id, placement_id) {
        // /users/3/company/isStudentDataAllowed/2
        let url = '/users/' + user_id + '/company/isStudentDataAllowed/' + placement_id;
        return HTTP.get(url);
      }

    }
