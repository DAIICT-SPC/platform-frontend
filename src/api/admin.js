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
  }

}
