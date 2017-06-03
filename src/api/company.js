import HTTP from '@/packages/http';


export default {

  getUserDetails(id) {
    // /users/3/company/show
    let url = '/users/' + id + '/company/show'
    return HTTP.get(url);
  },

  postUserDetails(id, company_name, address, contact_person,
  contact_no, company_expertise, company_url) {
    let url = '/users/' + id + '/company/update'
    return HTTP.patch(url, {
      company_name: company_name,
      address: address,
      contact_person: contact_person,
      contact_no: contact_no,
      company_expertise: company_expertise,
      company_url: company_url
    });
  },

  placementPrimary(id, job_title, job_description, last_date_for_registration, location, no_of_students,
    packages, job_type_id, placement_season_id) {
       // /users/2/company/createPlacement
      let url = '/users/' + id + '/company/createPlacement';
    return HTTP.post(url, {
      job_title: job_title,
      job_description: job_description,
      last_date_for_registration: last_date_for_registration,
      location: location,
      no_of_students: no_of_students,
      package: packages,
      job_type_id: job_type_id,
      placement_season_id: placement_season_id
    });
  },

  getPlacementSeasonsAvailable(id) {
    let url = '/users/' + id + '/company/showPlacementSeasonAvailable';
    return HTTP.get(url);
  }
}
