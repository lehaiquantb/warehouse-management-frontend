import axiosClient from './axiosClient';

const createSupplier = (supplier) => axiosClient.post('/suppliers', supplier);

const getSupplierPaging = (page, limit) =>
  axiosClient.get(`/suppliers/page/${page}/limit/${limit}`);

const getSupplierBySCode = (SCode) => axiosClient.get(`/suppliers/${SCode}`);
const updateSupplierBySCode = (SCode, newSupplier) =>
  axiosClient.put(`/suppliers/${SCode}`, newSupplier);
const deleteSupplierBySCode = (SCode) =>
  axiosClient.delete(`/suppliers/${SCode}`);
const getSupplierPagingFilterSorter = (pfs) =>
  axiosClient.post(`/suppliers/pagingFilterAndSorter`, pfs);
export default {
  createSupplier,
  getSupplierPaging,
  getSupplierPagingFilterSorter,
  getSupplierBySCode,
  updateSupplierBySCode,
  deleteSupplierBySCode
};
