import axiosClient from './axiosClient';

const videoApi = {
  
  async getAll(params) {
    const url = '/api/v1/video/getList';
    return axiosClient.get(url, {params})
  }
};

export default videoApi;
