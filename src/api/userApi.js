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

  putInfo (data) {
    const url = '/api/v1/user/update';
    return axiosClient.put(url, data)
  },

  getInfo (id) {
    const url = `/api/v1/user/getById/${id}`;
    return axiosClient.get(url, {id})
  },

  getVideoSave (id, params) {
    const url = `/api/v1/video/getByUserId/${id}`;
    return axiosClient.get(url, { params })
  },

  addVideo (idUser, idVideo) {
    const url = `/api/v1/user/addVideo/${idUser}/video/${idVideo}`;
    return axiosClient.post(url, {idUser, idVideo})
  },

  removeVideo (idUser, idVideo) {
    const url = `/api/v1/user/removeVideo/${idUser}/video/${idVideo}`;
    return axiosClient.post(url, {idUser, idVideo})
  },

  getAll (params) {
    const url = `/api/v1/user/getList`;
    return axiosClient.get(url, {params})
  },

  delete (id) {
    const url = `/api/v1/user/delete/${id}`;
    return axiosClient.delete(url)
  }
};

export default userApi;
