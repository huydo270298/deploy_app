import axiosClient from './axiosClient';

const videoApi = {
  
  getAll () {
    const url = '/products';
    return axiosClient.get(url)
  }
};

export default videoApi;
