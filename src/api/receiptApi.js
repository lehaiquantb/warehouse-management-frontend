import axiosClient from './axiosClient';

const createReceipt = (receipt) => axiosClient.post('/receipts', receipt);

const getReceiptPaging = (page, limit) =>
  axiosClient.get(`/receipts/page/${page}/limit/${limit}`);

const getReceiptByRCode = (RCode) => axiosClient.get(`/receipts/${RCode}`);
const updateReceiptByRCode = (RCode, newReceipt) =>
  axiosClient.put(`/receipts/${RCode}`, newReceipt);
const deleteReceiptByRCode = (RCode) =>
  axiosClient.delete(`/receipts/${RCode}`);
const getReceiptPagingFilterSorter = (pfs) =>
  axiosClient.post(`/receipts/pagingFilterAndSorter`, pfs);
const searchProduct = (q, page, limit) =>
  axiosClient.get(`/products/search?q=${q}&page=${page}&limit=${limit}`);
const searchSupplier = (q, page, limit) =>
  axiosClient.get(`/suppliers/search?q=${q}&page=${page}&limit=${limit}`);
export default {
  createReceipt,
  getReceiptPaging,
  getReceiptPagingFilterSorter,
  getReceiptByRCode,
  updateReceiptByRCode,
  deleteReceiptByRCode,
  searchProduct,
  searchSupplier,
};
