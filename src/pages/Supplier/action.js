export const actionTypes = {
    CREATE_SUPPLIER: 'CREATE_SUPPLIER',
    CREATE_SUPPLIER_SUCCESS: 'CREATE_SUPPLIER_SUCCESS',
    CREATE_SUPPLIER_FAILURE: 'CREATE_SUPPLIER_FAILURE',
    GET_SUPPLIER_PAGING: 'GET_SUPPLIER_PAGING',
    GET_SUPPLIER_PAGING_FILTER_SORTER: 'GET_SUPPLIER_PAGING_FILTER_SORTER',
    GET_SUPPLIER_PAGING_FILTER_SORTER_SUCCESS:
      'GET_SUPPLIER_PAGING_FILTER_SORTER_SUCCESS',
    GET_SUPPLIER_REQUESTING: 'GET_SUPPLIER_REQUESTING',
    GET_SUPPLIER_PAGING_SUCCESS: 'GET_SUPPLIER_PAGING_SUCCESS',
    GET_SUPPLIER_BY_SCODE: 'GET_SUPPLIER_BY_SCODE',
    GET_SUPPLIER_BY_SCODE_SUCCESS: 'GET_SUPPLIER_BY_SCODE_SUCCESS',
    UPDATE_SUPPLIER_BY_SCODE: 'UPDATE_SUPPLIER_BY_SCODE',
    UPDATE_SUPPLIER_BY_SCODE_SUCCESS: 'UPDATE_SUPPLIER_BY_SCODE_SUCCESS',
    UPDATE_SUPPLIER_BY_SCODE_FAILURE: 'UPDATE_SUPPLIER_BY_SCODE_FAILURE',
    DELETE_SUPPLIER_BY_SCODE: 'DELETE_SUPPLIER_BY_SCODE',
    DELETE_SUPPLIER_BY_SCODE_DONE: 'DELETE_SUPPLIER_BY_SCODE_DONE',
  };
  
  export function createSupplier(supplier) {
    return {
      type: actionTypes.CREATE_SUPPLIER,
      supplier,
    };
  }
  
  export function createSupplierSuccess() {
    return {
      type: actionTypes.CREATE_SUPPLIER_SUCCESS,
    };
  }
  
  export function createSupplierFailure() {
    return {
      type: actionTypes.CREATE_SUPPLIER_FAILURE,
    };
  }
  
  export function getSupplierPaging(page, limit) {
    return {
      type: actionTypes.GET_SUPPLIER_PAGING,
      page,
      limit,
    };
  }
  
  export function getSupplierPagingSuccess(listSupplierPaging, count) {
    return {
      type: actionTypes.GET_SUPPLIER_PAGING_SUCCESS,
      listSupplierPaging,
      count,
    };
  }
  
  export function getSupplierPFS(pfs) {
    return {
      type: actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER,
      pfs,
    };
  }
  export function getSupplierPFSSuccess(listSupplierPaging, count) {
    return {
      type: actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER_SUCCESS,
      listSupplierPaging,
      count,
    };
  }
  
  export function getSupplierBySCode(SCode) {
    return {
      type: actionTypes.GET_SUPPLIER_BY_SCODE,
      SCode,
    };
  }
  export function getSupplierBySCodeSuccess(supplierDetail) {
    return {
      type: actionTypes.GET_SUPPLIER_BY_SCODE_SUCCESS,
      supplierDetail,
    };
  }
  
  export function updateSupplierBySCode(SCode, newSupplier) {
    return {
      type: actionTypes.UPDATE_SUPPLIER_BY_SCODE,
      SCode,
      newSupplier,
    };
  }
  
  export function updateSupplierBySCodeSuccess(updatedSupplier) {
    return {
      type: actionTypes.UPDATE_SUPPLIER_BY_SCODE_SUCCESS,
      updatedSupplier,
    };
  }
  
  export function updateSupplierBySCodeFailure() {
    return {
      type: actionTypes.UPDATE_SUPPLIER_BY_SCODE_FAILURE,
    };
  }
  
  export function deleteSupplierBySCode(SCode) {
    return {
      type: actionTypes.DELETE_SUPPLIER_BY_SCODE,
      SCode,
    };
  }
  
  export function deleteSupplierBySCodeDone() {
    return {
      type: actionTypes.DELETE_SUPPLIER_BY_SCODE_DONE,
    };
  }
  