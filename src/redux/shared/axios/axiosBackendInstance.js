import axios from 'axios';

import withMocks from '../withMocks';

import { ROOT_URL } from '../../../../.env.json';

const axiosBackendInstance = axios.create({
  baseURL: ROOT_URL,
  timeout: 10000,

});

export default withMocks(axiosBackendInstance);
