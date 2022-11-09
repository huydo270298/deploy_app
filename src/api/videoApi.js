import axiosClient from './axiosClient';

const videoApi = {

  getAll(params) {
    const url = '/api/v1/video/getList';
    return axiosClient.get(url, { params })
  },

  getCategoryList(params) {
    const url = '/api/v1/category/getList';
    return axiosClient.get(url, { params })
  },

  getCategoryItem(id) {
    const url = `/api/v1/video/getByCategory/${id}`;
    return axiosClient.get(url, { id })
  },

  getBookmarksList(params) {
    const url = '/api/v1/category/getList';
    return axiosClient.get(url, { params })
  },

  getBookmarksItem(id) {
    const url = `/api/v1/video/thumbnail/${id}`;
    return axiosClient.get(url, { id })
  },
};

export default videoApi;
