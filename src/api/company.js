import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {

  placementPrimary(job_title, job_description, last_date_for_registration, location, no_of_students,
    packages, job_type_id, placement_season_id) {
      let id = Auth.getUserToken(); // /users/2/company/createPlacement
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
