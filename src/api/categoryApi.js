import axiosClient from './axiosClient';

const categoryApi = {
  
  get () {
    const url = `/api/v1/category/getList`;
    return axiosClient.get(url)
  },
};

export default categoryApi;
