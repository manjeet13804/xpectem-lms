import axios from 'axios';
import constants from 'helpers/constants';
import tokenProvider from 'components/axios-token-interceptor';

const axiosComponent = axios.create({
  baseURL: constants.api,
});

axiosComponent.interceptors.request.use(tokenProvider({
  getToken: () => `Bearer ${localStorage.getItem('id_token')}` || ' ',
}));

export default axiosComponent;
