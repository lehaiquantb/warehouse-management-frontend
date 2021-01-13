export const actionTypes = {
  ADD_CATEGORY: 'ADD_CATEGORY',
  ADD_CATEGORY_SUCCESS: 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILURE: 'ADD_CATEGORY_FAILURE',
  GET_LIST_CATEGORY: 'GET_LIST_CATEGORY',
  GET_LIST_CATEGORY_SUCCESS: 'GET_LIST_CATEGORY_SUCCESS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILURE: 'CREATE_PRODUCT_FAILURE',
  GET_PRODUCT_PAGING: 'GET_PRODUCT_PAGING',
  GET_PRODUCT_PAGING_FILTER_SORTER: 'GET_PRODUCT_PAGING_FILTER_SORTER',
  GET_PRODUCT_PAGING_FILTER_SORTER_SUCCESS:
    'GET_PRODUCT_PAGING_FILTER_SORTER_SUCCESS',
  GET_PRODUCT_REQUESTING: 'GET_PRODUCT_REQUESTING',
  GET_PRODUCT_PAGING_SUCCESS: 'GET_PRODUCT_PAGING_SUCCESS',
  GET_PRODUCT_BY_PCODE: 'GET_PRODUCT_BY_PCODE',
  GET_PRODUCT_BY_PCODE_SUCCESS: 'GET_PRODUCT_BY_PCODE_SUCCESS',
  UPDATE_PRODUCT_BY_PCODE: 'UPDATE_PRODUCT_BY_PCODE',
  UPDATE_PRODUCT_BY_PCODE_SUCCESS: 'UPDATE_PRODUCT_BY_PCODE_SUCCESS',
  UPDATE_PRODUCT_BY_PCODE_FAILURE: 'UPDATE_PRODUCT_BY_PCODE_FAILURE',
};

export function addCategory(category) {
  return {
    type: actionTypes.ADD_CATEGORY,
    category,
  };
}

export const addCategorySuccess = (listCategory) => ({
  type: actionTypes.ADD_CATEGORY_SUCCESS,
  listCategory,
});

export const addCategoryFailure = () => ({
  type: actionTypes.ADD_CATEGORY_FAILURE,
});

export function getListCategory() {
  return {
    type: actionTypes.GET_LIST_CATEGORY,
  };
}

export function getListCategorySuccess(listCategory) {
  return {
    type: actionTypes.GET_LIST_CATEGORY_SUCCESS,
    listCategory,
  };
}

export function createProduct(product) {
  return {
    type: actionTypes.CREATE_PRODUCT,
    product,
  };
}

export function createProductSuccess() {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
  };
}

export function createProductFailure() {
  return {
    type: actionTypes.CREATE_PRODUCT_FAILURE,
  };
}

export function getProductPaging(page, limit) {
  return {
    type: actionTypes.GET_PRODUCT_PAGING,
    page,
    limit,
  };
}

export function getProductPagingSuccess(listProductPaging, count) {
  return {
    type: actionTypes.GET_PRODUCT_PAGING_SUCCESS,
    listProductPaging,
    count,
  };
}

export function getProductPFS(pfs) {
  return {
    type: actionTypes.GET_PRODUCT_PAGING_FILTER_SORTER,
    pfs,
  };
}
export function getProductPFSSuccess(listProductPaging, count) {
  return {
    type: actionTypes.GET_PRODUCT_PAGING_FILTER_SORTER_SUCCESS,
    listProductPaging,
    count,
  };
}

export function getProductByPCode(PCode) {
  return {
    type: actionTypes.GET_PRODUCT_BY_PCODE,
    PCode,
  };
}
export function getProductByPCodeSuccess(productDetail) {
  return {
    type: actionTypes.GET_PRODUCT_BY_PCODE_SUCCESS,
    productDetail,
  };
}

export function updateProductByPCode(PCode, newProduct) {
  return {
    type: actionTypes.UPDATE_PRODUCT_BY_PCODE,
    PCode,
    newProduct,
  };
}

export function updateProductByPCodeSuccess(updatedProduct) {
  return {
    type: actionTypes.UPDATE_PRODUCT_BY_PCODE_SUCCESS,
    updatedProduct,
  };
}

export function updateProductByPCodeFailure() {
  return {
    type: actionTypes.UPDATE_PRODUCT_BY_PCODE_FAILURE,
  };
}
