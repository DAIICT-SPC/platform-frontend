import HTTP from '@/packages/http';

export default {
  all() {
    return HTTP.get('/categories');
  }
}
