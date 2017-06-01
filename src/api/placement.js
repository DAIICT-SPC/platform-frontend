import HTTP from '@/packages/http';
import Auth from '@/packages/auth/Auth';

let id = Auth.getUserToken();
export default {

  getPlacementById(id){
    let url = '/placement/' + id;
    return HTTP.get(url);
  }

}
