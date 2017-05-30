import HTTP from '@/packages/http';

export default {
  getByCode(code) {
    let url = '/activation/activate/' + code
    return HTTP.get(url);
  }
};
