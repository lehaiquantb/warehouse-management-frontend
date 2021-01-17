import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import receiptApi from '../../api/receiptApi';
import supplierApi from '../../api/supplierApi';
import productApi from '../../api/productApi';
import {
  actionTypes,
  createReceiptSuccess,
  createReceiptFailure,
  getReceiptPagingSuccess,
  getReceiptPFSSuccess,
  getReceiptByRCodeSuccess,
  updateReceiptByRCodeSuccess,
  updateReceiptByRCodeFailure,
  deleteReceiptByRCodeDone,
  searchProduct,
  searchProductDone,
  searchSupplierDone,
  getSupplierPFSSuccess
} from './action';
import { push } from 'connected-react-router';
import { isRequesting, isRequested } from '../../redux/actions/config';
import {
  notifFailureMes,
  notifSuccess,
} from '../../components/notification/Notification';

function* createReceipt({ receipt }) {
  try {
    const response = yield call(receiptApi.createReceipt, receipt);
    yield put(createReceiptSuccess());
    notifSuccess(`Tạo đơn nhập kho thành công`);
    //yield put(push(`/receipts/${response.RCode}`));
  } catch (e) {
    yield put(createReceiptFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getReceiptPagingSaga({ page, limit }) {
  try {
    const response = yield call(receiptApi.getReceiptPaging, page, limit);
    yield put(getReceiptPagingSuccess(response.receipts, response.count));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getReceiptPFSSaga({ pfs }) {
  try {
    const response = yield call(receiptApi.getReceiptPagingFilterSorter, pfs);
    yield put(getReceiptPFSSuccess(response.receipts, response.count));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getReceiptByRCodeSaga({ RCode }) {
  try {
    const response = yield call(receiptApi.getReceiptByRCode, RCode);
    yield put(getReceiptByRCodeSuccess(response));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* updateReceiptByRCodeSaga({ RCode, newReceipt }) {
  try {
    const response = yield call(
      receiptApi.updateReceiptByRCode,
      RCode,
      newReceipt,
    );
    yield put(updateReceiptByRCodeSuccess(response));
    notifSuccess(`Cập nhật thành công đơn nhập kho mã số ${RCode}`);
    yield put(push(`/receipts/${RCode}`));
  } catch (e) {
    //yield put(authFailure());
    yield put(updateReceiptByRCodeFailure());
    console.log('we got error here', e);
  }
}

function* deleteReceiptByRCodeSaga({ RCode }) {
  try {
    const response = yield call(receiptApi.deleteReceiptByRCode, RCode);
    notifSuccess(`Xóa thành công đơn nhập kho mã số ${RCode}`);
    yield put(deleteReceiptByRCodeDone());
    yield put(push(`/receipts`));
  } catch (e) {
    //yield put(authFailure());
    notifFailureMes('Xóa thất bại');
    yield put(deleteReceiptByRCodeDone());
    console.log('we got error here', e);
  }
}

function* searchProductSaga({ q, page, limit }) {
  try {
    const response = yield call(productApi.searchProduct, q, page, limit);
    yield put(searchProductDone(response.products, response.count));
    //yield put(push(`/receipts/${response.RCode}`));
  } catch (e) {
    yield put(searchProductDone([], 0));
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* searchSupplierSaga({ q, page, limit }) {
  try {
    const response = yield call(supplierApi.searchSupplier, q, page, limit);
    yield put(searchSupplierDone(response.suppliers, response.count));
    //yield put(push(`/receipts/${response.RCode}`));
  } catch (e) {
    yield put(searchSupplierDone([], 0));
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getSupplierPFSSaga({ pfs }) {
  try {
    const response = yield call(supplierApi.getSupplierPagingFilterSorter, pfs);
    yield put(getSupplierPFSSuccess(response.suppliers, response.count));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.CREATE_RECEIPT, createReceipt);
  yield takeEvery(actionTypes.GET_RECEIPT_PAGING, getReceiptPagingSaga);
  yield takeEvery(
    actionTypes.GET_RECEIPT_PAGING_FILTER_SORTER,
    getReceiptPFSSaga,
  );
  yield takeEvery(actionTypes.GET_RECEIPT_BY_RCODE, getReceiptByRCodeSaga);
  yield takeEvery(
    actionTypes.UPDATE_RECEIPT_BY_RCODE,
    updateReceiptByRCodeSaga,
  );
  yield takeEvery(
    actionTypes.DELETE_RECEIPT_BY_RCODE,
    deleteReceiptByRCodeSaga,
  );
  yield takeEvery(actionTypes.SEARCH_PRODUCT, searchProductSaga);
  yield takeEvery(actionTypes.SEARCH_SUPPLIER, searchSupplierSaga);
  yield takeEvery(
    actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER,
    getSupplierPFSSaga,
  );
}
