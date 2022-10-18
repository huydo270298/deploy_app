import axiosClient from './axiosClient';

const userApi = {
  save(data) {
    const url = '/user';
    return axiosClient.post(url, data);
  },
};

export default userApi;
