import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {
  all() {
    let id = Auth.getUserToken();
    let url = '/users/' + id + '/company/showPlacementSeasonAvailable'
    return HTTP.get(url);
  }
}
