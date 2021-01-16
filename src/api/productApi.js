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
export default {
  createProduct,
  getProductPaging,
  getProductPagingFilterSorter,
  getProductByPCode,
  updateProductByPCode,
  deleteProductByPCode
};
