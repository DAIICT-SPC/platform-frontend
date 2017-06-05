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
    })
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

}
