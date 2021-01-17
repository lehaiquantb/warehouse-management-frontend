import axiosClient from './axiosClient';

const createProduct = (product) => axiosClient.post('/products', product);

const getProductPaging = (page, limit) =>
  axiosClient.get(`/products/page/${page}/limit/${limit}`);

const getProductByPCode = (PCode) => axiosClient.get(`/products/${PCode}`);
const updateProductByPCode = (PCode, newProduct) =>
  axiosClient.put(`/products/${PCode}`, newProduct);
const deleteProductByPCode = (PCode) =>
  axiosClient.delete(`/products/${PCode}`);
const getProductPagingFilterSorter = (pfs) =>
  axiosClient.post(`/products/pagingFilterAndSorter`, pfs);
const searchProduct = (q, page, limit) =>
  axiosClient.get(`/products/search?q=${q}&page=${page}&limit=${limit}`);
export default {
  createProduct,
  getProductPaging,
  getProductPagingFilterSorter,
  getProductByPCode,
  updateProductByPCode,
  deleteProductByPCode,
  searchProduct,
};
