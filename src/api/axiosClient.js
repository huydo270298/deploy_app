import axios from 'axios';
import StorageKeys from '../constants/storage-keys';

const axiosClient = axios.create({
  baseURL: `http://${StorageKeys.PATH}`,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem(StorageKeys.TOKEN)}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const {config, status, data} = error.response;
    // const URLS = ['/auth/local/register', '/auth/local']
    // if(URLS.includes(config.url) && status === 400) {
    //   const errorList = data.data || [];
    //   const fistError = errorList.length > 0 ? errorList[0] : {};
    //   const mesList = fistError.messages || [];
    //   const fistMes = mesList.length > 0 ? mesList[0] : {};
    //   throw new Error(fistMes.message);
    // }

    return Promise.reject(error);
  },
);

export default axiosClient;
