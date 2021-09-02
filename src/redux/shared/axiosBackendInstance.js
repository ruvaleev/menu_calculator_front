import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import withMocks from './withMocks';

import { ROOT_URL } from '../../../.env.json';

const axiosBackendInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10000,

});

axiosBackendInstance.interceptors.request.use(
  async config => {
    let access_token = await AsyncStorage.getItem('AccessToken')

    if (typeof(access_token) == 'undefined') {
      access_token = null
    }

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
);


export default withMocks(axiosBackendInstance);
