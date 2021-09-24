import axiosBackendInstance from './axiosBackendInstance';

const setupInterceptors = (store) => {
  axiosBackendInstance.interceptors.request.use(
    async config => {
      const authToken = store.getState().authenticationsReducer.authToken

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  );
};

export default setupInterceptors;
