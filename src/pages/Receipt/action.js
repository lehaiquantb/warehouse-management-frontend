export const actionTypes = {
  CREATE_RECEIPT: 'CREATE_RECEIPT',
  CREATE_RECEIPT_SUCCESS: 'CREATE_RECEIPT_SUCCESS',
  CREATE_RECEIPT_FAILURE: 'CREATE_RECEIPT_FAILURE',
  GET_RECEIPT_PAGING: 'GET_RECEIPT_PAGING',
  GET_RECEIPT_PAGING_FILTER_SORTER: 'GET_RECEIPT_PAGING_FILTER_SORTER',
  GET_RECEIPT_PAGING_FILTER_SORTER_SUCCESS:
    'GET_RECEIPT_PAGING_FILTER_SORTER_SUCCESS',
  GET_RECEIPT_REQUESTING: 'GET_RECEIPT_REQUESTING',
  GET_RECEIPT_PAGING_SUCCESS: 'GET_RECEIPT_PAGING_SUCCESS',
  GET_RECEIPT_BY_RCODE: 'GET_RECEIPT_BY_RCODE',
  GET_RECEIPT_BY_RCODE_SUCCESS: 'GET_RECEIPT_BY_RCODE_SUCCESS',
  UPDATE_RECEIPT_BY_RCODE: 'UPDATE_RECEIPT_BY_RCODE',
  UPDATE_RECEIPT_BY_RCODE_SUCCESS: 'UPDATE_RECEIPT_BY_RCODE_SUCCESS',
  UPDATE_RECEIPT_BY_RCODE_FAILURE: 'UPDATE_RECEIPT_BY_RCODE_FAILURE',
  DELETE_RECEIPT_BY_RCODE: 'DELETE_RECEIPT_BY_RCODE',
  DELETE_RECEIPT_BY_RCODE_DONE: 'DELETE_RECEIPT_BY_RCODE_DONE',
  SEARCH_PRODUCT: 'SEARCH_PRODUCT',
  SEARCH_PRODUCT_DONE: 'SEARCH_PRODUCT_DONE',
  SEARCH_SUPPLIER: 'SEARCH_SUPPLIER',
  SEARCH_SUPPLIER_DONE: 'SEARCH_SUPPLIER_DONE',
};

export function createReceipt(receipt) {
  return {
    type: actionTypes.CREATE_RECEIPT,
    receipt,
  };
}

export function createReceiptSuccess() {
  return {
    type: actionTypes.CREATE_RECEIPT_SUCCESS,
  };
}

export function createReceiptFailure() {
  return {
    type: actionTypes.CREATE_RECEIPT_FAILURE,
  };
}

export function getReceiptPaging(page, limit) {
  return {
    type: actionTypes.GET_RECEIPT_PAGING,
    page,
    limit,
  };
}

export function getReceiptPagingSuccess(listReceiptPaging, count) {
  return {
    type: actionTypes.GET_RECEIPT_PAGING_SUCCESS,
    listReceiptPaging,
    count,
  };
}

export function getReceiptPFS(pfs) {
  return {
    type: actionTypes.GET_RECEIPT_PAGING_FILTER_SORTER,
    pfs,
  };
}
export function getReceiptPFSSuccess(listReceiptPaging, count) {
  return {
    type: actionTypes.GET_RECEIPT_PAGING_FILTER_SORTER_SUCCESS,
    listReceiptPaging,
    count,
  };
}

export function getReceiptByRCode(RCode) {
  return {
    type: actionTypes.GET_RECEIPT_BY_RCODE,
    RCode,
  };
}
export function getReceiptByRCodeSuccess(receiptDetail) {
  return {
    type: actionTypes.GET_RECEIPT_BY_RCODE_SUCCESS,
    receiptDetail,
  };
}

export function updateReceiptByRCode(RCode, newReceipt) {
  return {
    type: actionTypes.UPDATE_RECEIPT_BY_RCODE,
    RCode,
    newReceipt,
  };
}

export function updateReceiptByRCodeSuccess(updatedReceipt) {
  return {
    type: actionTypes.UPDATE_RECEIPT_BY_RCODE_SUCCESS,
    updatedReceipt,
  };
}

export function updateReceiptByRCodeFailure() {
  return {
    type: actionTypes.UPDATE_RECEIPT_BY_RCODE_FAILURE,
  };
}

export function deleteReceiptByRCode(RCode) {
  return {
    type: actionTypes.DELETE_RECEIPT_BY_RCODE,
    RCode,
  };
}

export function deleteReceiptByRCodeDone() {
  return {
    type: actionTypes.DELETE_RECEIPT_BY_RCODE_DONE,
  };
}

export function searchProduct(q, page, limit) {
  return {
    type: actionTypes.SEARCH_PRODUCT,
    q,
    page,
    limit,
  };
}

export function searchProductDone(listProductSearch, countProductSearch) {
  return {
    type: actionTypes.SEARCH_PRODUCT_DONE,
    listProductSearch,
    countProductSearch,
  };
}

export function searchSupplier(q, page, limit) {
  return {
    type: actionTypes.SEARCH_SUPPLIER,
    q,
    page,
    limit,
  };
}

export function searchSupplierDone(listSupplierSearch, countSupplierSearch) {
  return {
    type: actionTypes.SEARCH_SUPPLIER_DONE,
    listSupplierSearch,
    countSupplierSearch,
  };
}
