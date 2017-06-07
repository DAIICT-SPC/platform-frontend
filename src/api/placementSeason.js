import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

export default {

  all(user_id) {
    let url = '/users/' + user_id + '/company/showPlacementSeasonAvailable'
    return HTTP.get(url);
  },
  
}
