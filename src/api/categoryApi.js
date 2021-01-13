import axiosClient from './axiosClient';

const createCategory = (category) => axiosClient.post('/category', category);

const getListCategory = () => axiosClient.get('/category/page/1/limit/30');
export default { createCategory, getListCategory };
