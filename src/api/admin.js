import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {

  getAdminDetails(id) {
    let url = '/users/' + id + '/admin/show';
    return HTTP.get(url);
  },

  adminDashboard() {
    // api/placement_season/  add that are not draft
    let url = '/placement_season/';
    return HTTP.get(url);
  },

  getUserDetails(id) {
    // /users/2/company/show
    let url = '/users/' + id + '/admin/show'
    return HTTP.get(url);
  },

  postUserDetails(id, name) {
    let url = '/users/' + id + '/admin/update'
    return HTTP.patch(url, {
      name: name
    });
  },

  // /users/22/company/updatePersonal
  patchCompanyPassword(user_id, password) {
    let url = '/users/' + user_id + '/admin/updatePersonal'
    return HTTP.patch(url, {
      password: password
    });
  },

  postloginas(user_id) {
    let url = '/loginAs/' + user_id;
    return HTTP.post(url);
  },

  loginasReason(user_id, to_user_id, reason) {
    // /users/{user_id}/admin/loginAs/{to_user_id}
    let url = '/users/' + user_id + '/admin/loginAs/' + to_user_id;
     return HTTP.post(url, {
       reason: reason
     });
  },

  createSeason(title) {
    let url = '/placement_season'
    return HTTP.post(url, {
      title: title
    });
  },

  getPlacementsInSeasons(id) {
    // /placement_season/placementsInPlacementSeason/1
    let url = '/placement_season/placementsInPlacementSeason/' + id;
    return HTTP.get(url);
  },

  getCompanywisePlacementListing(id) {
    //  /placement_season/allAllowedCompanies/1
    let url = '/placement_season/allAllowedCompanies/' + id;
    return HTTP.get(url);
  },

  getCompanywisePlacement(season_id, company_id) {
    //  /placement_season/placementsCompanyWiseListing/1/1
    let url = '/placement_season/placementsCompanyWiseListing/' + season_id + '/' + company_id;
    return HTTP.get(url);
  },

  getAllowedCompanies(season_id) {
    // /placement_season/companiesAllowedOrNot/1
    let url = '/placement_season/companiesAllowedOrNot/' + season_id;
    return HTTP.get(url);
  },

  postAllowCompany(season_id, company_id) {
    // /placement_season/allowCompany/1
    let url = '/placement_season/allowCompany/' + season_id;
    return HTTP.post(url, {
      company_id: company_id
    });
  },

  postDisallowCompany(season_id, company_id) {
    // /placement_season/disallowCompany/1
    let url = '/placement_season/disallowCompany/' + season_id;
    return HTTP.post(url, {
      company_id: company_id
    });
  },

  getAdminPlacementDetails(user_id, placement_id) {
    // /users/1/admin/1/showPlacementDetails/
    let url = '/users/' + user_id + '/admin/' + placement_id + '/showPlacementDetails/';
    return HTTP.get(url);
  },

  // get students to application round
  getRemainingStudentsInApplication(user_id, placement_id) {
    // /users/1/admin/remainingStudentsInApplication/1
    let url = '/users/' + user_id + '/admin/remainingStudentsInApplication/' + placement_id;
    return HTTP.get(url);
  },

  // from application, move to next round
  postAdminMoveToFirstRound(user_id, placement_id, arr) {
    // /users/1/admin/1/selectStudentsFromApplication
    let url = '/users/' + user_id + '/admin/' + placement_id + '/selectStudentsFromApplication';
    return HTTP.post(url, {
      students_from_applications_checkbox: arr
    });
  },

  // get students from {round_id}
  getRemainingStudentsRoundwise(user_id, placement_id, round_id) {
    // /users/1/admin/remainingStudentsRoundwise/{placementId}/{roundID}
    let url = '/users/' + user_id + '/admin/remainingStudentsRoundwise/' + placement_id + '/' + round_id;
    return HTTP.get(url);
  },

  // from any round, move to next round automatically
  postAdminMoveToNextRound(user_id, placement_id, arr, round_no) {
    // /users/1/admin/{placementId}/selectStudentsRoundwise
    let url = '/users/' + user_id + '/admin/' + placement_id + '/selectStudentsRoundwise/' + round_no;
    return HTTP.post(url, {
      student_roundwise: arr
    });
  },

  getStudentsForOffer(user_id, placement_id) {
    // /users/1/admin/remainingStudentsForOffer/1
    let url = '/users/' + user_id + '/admin/remainingStudentsForOffer/' + placement_id;
    return HTTP.get(url);
  },

  // updates job_title, job_description and location details for a placement drive
  updatePlacementDriveDescription(user_id, palcement_id, job_title, location, job_description, package_amount, no_of_students) {
    // /users/2/admin/6/updatePlacementsPrimary
    let url = '/users/' + user_id + '/admin/' + palcement_id + '/updatePlacementsPrimary';
    return HTTP.patch(url, {
      job_title: job_title,
      location: location,
      job_description: job_description,
      package: package_amount,
      no_of_students: no_of_students
    });
  },

  postGiveOffer(user_id, placement_id, enroll_no, packageOffer) {
    // /users/1/admin/{placement_id}/giveOffer
    let url = '/users/' + user_id + '/admin/' + placement_id + '/giveOffer';
    return HTTP.post(url, {
      enroll_no: enroll_no,
      package: packageOffer
    });
  },

  // /users/{userid}/admin/{placement_id}/updateCriteria
  patchUpdateEligibilityCriteria(user_id, placement_id, education_id, category_id, cpi_required) {
    let url = '/users/'+ user_id +'/admin/' + placement_id + '/updateCriteria'
    return HTTP.patch(url, {
      education_id: education_id,
      category_id: category_id,
      cpi_required: cpi_required
    });
  },

  deleteCriteria(user_id, placement_id, category_id, education_id) {
    // /users/user_id/admin/deleteEducationCriteria/{placement_id}/{category_id}
    let url = '/users/' + user_id + '/admin/deleteEducationCriteria/' + placement_id + '/' + category_id + '/' + education_id;
    return HTTP.delete(url);
  },

  postReOpenRegistration(user_id, placement_id, last_data_for_registration) {
    // /users/1/admin/{placement_id}/reOpenRegistration
    let url = '/users/' + user_id + '/admin/' + placement_id + '/reOpenRegistration';
    return HTTP.post(url, {
      last_date_for_registration: last_data_for_registration
    });
  },


  // /users/1/admin/externalAllowToStudents/1
  allowExternalStudents(user_id, placement_id, enroll_no) {
    let url = '/users/' + user_id + '/admin/externalAllowToStudents/' + placement_id;
    return HTTP.post(url, {
      enroll_no: enroll_no
    });
  },

  postRoundDetails(user_id, placement_id, round_id, date_of_round, venue, date, time) {
    // /users/{user_id}/admin/{placement_id}/update/{round_no}
    let url = '/users/' + user_id + '/admin/' + placement_id + '/update/' + round_id;
    return HTTP.patch(url, {
      date_of_round: date_of_round,
      venue: venue,
      date: date,
      time: time
    });
  },

  // application modal
  getApplicationList(user_id, placement_id) {
    // /users/id/admin/placementApplications/p_id
    let url = '/users/' + user_id + '/admin/placementApplications/' + placement_id;
    return HTTP.get(url);
  },

  postDownloadResumes(user_id, checkbox) {
    let url = '/users/' + user_id + '/admin/downloadResume';
    return HTTP.post(url, {
      checkbox: checkbox
    });
  },

  getManagePlacementSeason() {
    // /placement_season/
    let url = '/placement_season/';
    return HTTP.get(url);
  },

  postStartSeason(placement_season_id) {
    let url = '/placement_season/startSeason/' + placement_season_id;
    return HTTP.post(url);
  },

  postCloseSeason(placement_season_id) {
    let url = '/placement_season/closeSeason/' + placement_season_id;
    return HTTP.post(url);
  },

  // / users / {user_id} / admin / roundWisePlacementDetail /  {placement_id} / {round_no}
  getRoundwiseList(user_id, placement_id, round_no) {
    let url = '/users/' + user_id + '/admin/roundWisePlacementDetail/' + placement_id + '/' + round_no;
    return HTTP.get(url);
  },

  // getOfferRoundList
  getOfferRoundList(user_id, placement_id) {
    let url = '/users/' + user_id + '/admin/getAllOfferLetter/' + placement_id;
    return HTTP.get(url);
  },

  getPlacedStudents(user_id, season_id) {
    // / users / {user_id} / admin / listOfStudentsPlaced / {season_id}
    let url = '/users/' + user_id + '/admin/listOfStudentsPlaced/' + season_id;
    return HTTP.get(url);
  },

  getPlacedCategoryStudents(user_id, season_id, category_id) {
    // / users / {user_id} / admin / listOfStudentsPlacedCategoryWise / {season_id} / {category_id}
    let url = '/users/' + user_id + '/admin/listOfStudentsPlacedCategoryWise/' + season_id + '/' + category_id;
    return HTTP.get(url);
  },
  // /studentsUnplaced/{placement_season_id}

  getUnplacedStudents(user_id, season_id) {
    // / users / {user_id} / admin /studentsUnplaced/{placement_season_id}
    let url = '/users/' + user_id + '/admin/studentsUnplaced/' + season_id;
    return HTTP.get(url);
  },

  getUnplacedCategoryStudents(user_id, season_id) {
    // users / {user_id} / admin / studentsUnplacedCategoryWise/ {season_id} / {category_id}
    let url = '/users/' + user_id + '/admin/studentsUnplacedCategoryWise/' + season_id + '/' + category_id;
    return HTTP.get(url);
  },

  getExternalAllowedStudents(user_id, season_id) {
    //  / users / {user_id} / admin / externallyAllowed / {placement_season_id}
    let url = '/users/' + user_id + '/admin/externallyAllowed/' + season_id;
    return HTTP.get(url);
  },

  // api/users/{user_id}/admin/listOfStudentsPlacedCategoryWise/{placement_season_id}/{category_id}
  getStudentsPlacedCategorywise(user_id, placement_season_id, category_id) {
    let url = '/users/' + user_id + '/admin/listOfStudentsPlacedCategoryWise/' + placement_season_id + '/' + category_id;
    return HTTP.get(url);
  },

  // api/users/{user_id}/admin/studentsUnplacedCategoryWise/{placement_season_id}/{category_id}
  getStudentsUnplacedCategoryWise(user_id, placement_season_id, category_id) {
    let url = '/users/' + user_id + '/admin/studentsUnplacedCategoryWise/' + placement_season_id + '/' + category_id;
    return HTTP.get(url);
  },

  getStudentWiseReport(user_id, placement_id, enroll_no) {
    // /users/user_id}/admin/reportStudentWise/{placement_season_id}/{enroll_no}
    let url = '/users/' + user_id + '/admin/reportStudentWise/' + placement_id + '/' + enroll_no;
    return HTTP.get(url);
  },

  getStudentDetail(user_id, enroll_no) {
    // /users/3/admin/studentDetail/201612105
    let url = '/users/' + user_id + '/admin/studentDetail/' + enroll_no;
    return HTTP.get(url);
  },

  activationViaFileUpload(csvfile, role) {
    let url = '/activation/file';
    return HTTP.post(url, {
      csv: csvfile,
      role: role
    });
  },

  isStudentDataAllowed(user_id, placement_id) {
    // /users/3/admin/isStudentDataAllowed/2
    let url = '/users/' + user_id + '/admin/isStudentDataAllowed/' + placement_id;
    return HTTP.get(url);
  },

  allowStudentData(user_id, placement_id) {
    // /users/{user_id}/admin/allowStudentData/{placement_id}
    let url = '/users/' + user_id + '/admin/allowStudentData/' + placement_id;
    return HTTP.post(url);
  },

  getFeedbackByPlacementId(user_id, placement_id) {
    // /users/{user_id}/admin/getFeedbackList/{placement_id}
    let url = '/users/' + user_id + '/admin/getFeedbackList/' + placement_id;
    return HTTP.get(url);
  },

  getLoginRecordsForAdmin(user_id) {
    // /users/{user_id}/admin/loginRecordsForAdmin
    let url = '/users/' + user_id + '/admin/loginRecordsForAdmin';
    return HTTP.get(url);
  },

  getLoginRecordsForCompany(user_id) {
    // /users/{user_id}/admin/loginRecordsForCompany
    let url = '/users/' + user_id + '/admin/loginRecordsForCompany';
    return HTTP.get(url);
  },


}
