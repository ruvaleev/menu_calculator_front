import MockAdapter from 'axios-mock-adapter';

import authenticationsHandlers from './handlers/authenticationsHandlers';

const withMocks = function(axiosInstance) {

  var mock = new MockAdapter(process.env.NODE_ENV !== 'production' && axiosInstance);

  authenticationsHandlers(mock);

  return axiosInstance;
}

export default withMocks;
