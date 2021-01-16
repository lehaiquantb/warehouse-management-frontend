import { actionTypes } from './action';

const defaultState = {
  page: 1,
  limit: 10,
  count: 0,
  listSupplierPaging: [],
  isSupplierPagingRequesting: false,
  supplierDetail: {},
  isDeletingSupplier: false,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUPPLIER_PAGING: {
      return {
        ...state,
        page: action.page,
        limit: action.limit,
        isSupplierPagingRequesting: true,
      };
    }
    case actionTypes.GET_SUPPLIER_PAGING_SUCCESS: {
      return {
        ...state,
        listSupplierPaging: action.listSupplierPaging,
        isSupplierPagingRequesting: false,
        count: action.count,
      };
    }
    case actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER: {
      return {
        ...state,
        isSupplierPagingRequesting: true,
      };
    }
    case actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER_SUCCESS: {
      return {
        ...state,
        isSupplierPagingRequesting: false,
        listSupplierPaging: action.listSupplierPaging,
        count: action.count,
      };
    }
    case actionTypes.GET_SUPPLIER_BY_SCODE: {
      return {
        ...state,
      };
    }

    case actionTypes.GET_SUPPLIER_BY_SCODE_SUCCESS: {
      return {
        ...state,
        supplierDetail: action.supplierDetail,
      };
    }
    case actionTypes.DELETE_SUPPLIER_BY_SCODE: {
      return {
        ...state,
        isDeletingSupplier: true,
      };
    }
    case actionTypes.DELETE_SUPPLIER_BY_SCODE_DONE: {
      return {
        ...state,
        isDeletingSupplier: false,
      };
    }
    default:
      return state;
  }
};
