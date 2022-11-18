import axiosClient from './axiosClient';

const userApi = {
  register (data) {
    const url = '/api/v1/auth/registry';
    return axiosClient.post(url, data)
  },

  login (data) {
    const url = '/api/v1/auth/login';
    return axiosClient.post(url, data)
  },

  put (data) {
    const url = '/api/v1/user/update';
    return axiosClient.put(url, data)
  },

  get (id) {
    const url = `/api/v1/user/getById/${id}`;
    return axiosClient.get(url, {id})
  },

  addVideo (idUser, idVideo) {
    const url = `/api/v1/user/addVideo/${idUser}/video/${idVideo}`;
    return axiosClient.post(url, {idUser, idVideo})
  },

  removeVideo (idUser, idVideo) {
    const url = `/api/v1/user/removeVideo/${idUser}/video/${idVideo}`;
    return axiosClient.post(url, {idUser, idVideo})
  }
};

export default userApi;
