import { actionTypes } from './action';

const defaultState = {
  status: '',
  error: null,
  page: 1,
  limit: 10,
  count: 0,
  listReceiptPaging: [],
  isReceiptPagingRequesting: false,
  receiptDetail: {},
  isDeletingReceipt: false,
  isSearchingProduct: false,
  isSearchingSupplier: false,
  listProductSearch: [],
  listSupplierSearch: [],
  countProductSearch: 0,
  countSupplierSearch: 0,
  listSupplierPaging: [],
  isSupplierPagingRequesting: false,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECEIPT_PAGING: {
      return {
        ...state,
        page: action.page,
        limit: action.limit,
        isReceiptPagingRequesting: true,
      };
    }
    case actionTypes.GET_RECEIPT_PAGING_SUCCESS: {
      return {
        ...state,
        listReceiptPaging: action.listReceiptPaging,
        isReceiptPagingRequesting: false,
        count: action.count,
      };
    }
    case actionTypes.GET_RECEIPT_PAGING_FILTER_SORTER: {
      return {
        ...state,
        isReceiptPagingRequesting: true,
      };
    }
    case actionTypes.GET_RECEIPT_PAGING_FILTER_SORTER_SUCCESS: {
      return {
        ...state,
        isReceiptPagingRequesting: false,
        listReceiptPaging: action.listReceiptPaging,
        count: action.count,
      };
    }
    case actionTypes.GET_RECEIPT_BY_RCODE: {
      return {
        ...state,
      };
    }

    case actionTypes.GET_RECEIPT_BY_RCODE_SUCCESS: {
      return {
        ...state,
        receiptDetail: action.receiptDetail,
      };
    }
    case actionTypes.DELETE_RECEIPT_BY_RCODE: {
      return {
        ...state,
        isDeletingReceipt: true,
      };
    }
    case actionTypes.DELETE_RECEIPT_BY_RCODE_DONE: {
      return {
        ...state,
        isDeletingReceipt: false,
      };
    }
    case actionTypes.SEARCH_PRODUCT: {
      return {
        ...state,
        isSearchingProduct: true,
      };
    }
    case actionTypes.SEARCH_PRODUCT_DONE: {
      return {
        ...state,
        isSearchingProduct: false,
        listProductSearch: action.listProductSearch,
        countProductSearch: action.countProductSearch,
      };
    }
    case actionTypes.SEARCH_SUPPLIER: {
      return {
        ...state,
        isSearchingSupplier: true,
      };
    }
    case actionTypes.SEARCH_SUPPLIER_DONE: {
      return {
        ...state,
        isSearchingSupplier: false,
        listSupplierSearch: action.listSupplierSearch,
        countSupplierSearch: action.countSupplierSearch,
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
    default:
      return state;
  }
};
