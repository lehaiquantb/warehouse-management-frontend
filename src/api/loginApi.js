import axiosClient from './axiosClient';

const login = (data) => axiosClient.post('/users/login', data);
const auth = () => axiosClient.post('/users/auth');
const logout = (data) => axiosClient.post('/users/logout', data);
const register = (data) => axiosClient.post('/users/create', data);
export default { login, auth, logout, register };
