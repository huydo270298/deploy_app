import axiosClient from './axiosClient';

const videoApi = {
  
  async getAll(params) {
    const url = '/products';
    return axiosClient.get(url, {params})
  }
};

export default videoApi;
