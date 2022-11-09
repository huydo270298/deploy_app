import axiosClient from './axiosClient';

const spinApi = {
  
  getResult(id) {
    const url = `/api/v1/spin/result/${id}`;
    return axiosClient.get(url, {id})
  },
};

export default spinApi;
