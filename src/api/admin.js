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

  postUserDetails(id, name, contact_no, position) {
    let url = '/users/' + id + '/admin/update'
    return HTTP.patch(url, {
      name: name,
      contact_no: contact_no,
      position: position
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
  postAdminMoveToNextRound(user_id, placement_id, arr) {
    console.log(arr);
    // /users/1/admin/{placementId}/selectStudentsRoundwise
    let url = '/users/' + user_id + '/admin/' + placement_id + '/selectStudentsRoundwise';
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
  updatePlacementDriveDescription(user_id, palcement_id, job_title, location, job_description) {
    // /users/2/company/6/updatePlacementsPrimary
    let url = '/users/' + user_id + '/admin/' + palcement_id + '/updatePlacementsPrimary';
    return HTTP.patch(url, {
      job_title: job_title,
      location: location,
      job_description: job_description
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

  postReOpenRegistration(user_id, placement_id, last_data_for_registration) {
    // /users/1/admin/{placement_id}/reOpenRegistration
    console.log(last_data_for_registration);
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
    console.log("admin");
    console.log(checkbox);
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
    console.log(url);
    return HTTP.get(url);
  },

  // getOfferRoundList
  getOfferRoundList(user_id, placement_id) {
    let url = '/users/' + user_id + '/admin/getAllOfferLetter/' + placement_id;
    console.log(url);
    return HTTP.get(url);
  },


}
