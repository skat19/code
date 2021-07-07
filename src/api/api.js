import axios from "axios";

let instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "94bf05dd-8d57-434d-8ad2-f46b9639bcd2",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instanse
      .get(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => response.data);
  },
  follow(id) {
    return instanse.post(`follow/${id}`).then((response) => response.data);
  },
  unfollow(id) {
    return instanse.delete(`follow/${id}`).then((response) => response.data);
  },
  getProfile(userId) {
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instanse.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instanse
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status) {
    return instanse
      .put(`/profile/status`, { status })
      .then((response) => response.data);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instanse
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile) {
    return instanse.put(`profile`, profile).then((response) => response.data);
  },
};

export const authAPI = {
  me() {
    return instanse.get(`auth/me`).then((response) => response.data);
  },
  login(email, password, rememberMe) {
    return instanse
      .post(`auth/login`, { email, password, rememberMe })
      .then((response) => response.data);
  },
  logout() {
    return instanse.delete(`auth/login`).then((response) => response.data);
  },
};
