import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import supplierApi from '../../api/supplierApi';
import {
  actionTypes,
  createSupplierSuccess,
  createSupplierFailure,
  getSupplierPagingSuccess,
  getSupplierPFSSuccess,
  getSupplierBySCodeSuccess,
  updateSupplierBySCodeSuccess,
  updateSupplierBySCodeFailure,
  deleteSupplierBySCodeDone,
} from './action';
import { push } from 'connected-react-router';
import { isRequesting, isRequested } from '../../redux/actions/config';
import {
  notifFailureMes,
  notifSuccess,
} from '../../components/notification/Notification';

function* createSupplier({ supplier }) {
  try {
    const response = yield call(supplierApi.createSupplier, supplier);
    yield put(createSupplierSuccess());
    notifSuccess(`Tạo nhà cung cấp mới thành công`);
    //yield put(push(`/suppliers/${response.SCode}`));
  } catch (e) {
    yield put(createSupplierFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getSupplierPagingSaga({ page, limit }) {
  try {
    const response = yield call(supplierApi.getSupplierPaging, page, limit);
    yield put(getSupplierPagingSuccess(response.suppliers, response.count));
  } catch (e) {
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

function* getSupplierBySCodeSaga({ SCode }) {
  try {
    const response = yield call(supplierApi.getSupplierBySCode, SCode);
    yield put(getSupplierBySCodeSuccess(response));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* updateSupplierBySCodeSaga({ SCode, newSupplier }) {
  try {
    const response = yield call(
      supplierApi.updateSupplierBySCode,
      SCode,
      newSupplier,
    );
    yield put(updateSupplierBySCodeSuccess(response));
    notifSuccess(`Cập nhật thành công nhà cung cấp mã số ${SCode}`);
    yield put(push(`/suppliers/${SCode}`));
  } catch (e) {
    //yield put(authFailure());
    yield put(updateSupplierBySCodeFailure());
    console.log('we got error here', e);
  }
}

function* deleteSupplierBySCodeSaga({ SCode }) {
  try {
    const response = yield call(supplierApi.deleteSupplierBySCode, SCode);
    notifSuccess(`Xóa thành công nhà cung cấp mã số ${SCode}`);
    yield put(deleteSupplierBySCodeDone());
    yield put(push(`/suppliers`));
  } catch (e) {
    //yield put(authFailure());
    notifFailureMes('Xóa thất bại');
    yield put(deleteSupplierBySCodeDone());
    console.log('we got error here', e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.CREATE_SUPPLIER, createSupplier);
  yield takeEvery(actionTypes.GET_SUPPLIER_PAGING, getSupplierPagingSaga);
  yield takeEvery(
    actionTypes.GET_SUPPLIER_PAGING_FILTER_SORTER,
    getSupplierPFSSaga,
  );
  yield takeEvery(actionTypes.GET_SUPPLIER_BY_SCODE, getSupplierBySCodeSaga);
  yield takeEvery(
    actionTypes.UPDATE_SUPPLIER_BY_SCODE,
    updateSupplierBySCodeSaga,
  );
  yield takeEvery(
    actionTypes.DELETE_SUPPLIER_BY_SCODE,
    deleteSupplierBySCodeSaga,
  );
}
