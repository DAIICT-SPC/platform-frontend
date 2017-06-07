import HTTP from '@/packages/http';

export default {

  getUserDetails(user_id) {
    // /users/3/company/show
    let url = '/users/' + user_id + '/company/show'
    return HTTP.get(url);
  },

  postUserDetails(user_id, company_name, address, contact_person,
    contact_no, company_expertise, company_url) {
      let url = '/users/' + user_id + '/company/update'
      return HTTP.patch(url, {
        company_name: company_name,
        address: address,
        contact_person: contact_person,
        contact_no: contact_no,
        company_expertise: company_expertise,
        company_url: company_url
      });
    },

    getCompanyDashboard(user_id) {
      // /users / {user_id} / company /placementPrimaryAll
      let url = '/users/' + user_id + '/company/placementPrimaryAll';
      return HTTP.get(url);
    },

    placementPrimary(user_id, job_title, job_description, last_date_for_registration, location, no_of_students,
      packages, job_type_id, placement_season_id) {
        let url = '/users/' + user_id + '/company/createPlacement';
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

      selectCategory(user_id, placement_id, openFor_checkbox) {
        console.log(openFor_checkbox);
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

      getCategoriesForPlacementCriteria(user_id, placement_id) {
        // / users / {user_id} / company /{placement_id} / showOpenFor
        let url = '/users/' + user_id + '/company/' + placement_id + '/showOpenFor';
        return HTTP.get(url);
      },

      getPlacementSeasonsAvailable(user_id) {
        let url = '/users/' + user_id + '/company/showPlacementSeasonAvailable';
        return HTTP.get(url);
      }
    }
