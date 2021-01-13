import { take, fork, delay, put, takeEvery, call } from 'redux-saga/effects';
import categoryApi from '../../api/categoryApi';
import productApi from '../../api/productApi';
import {
  addCategorySuccess,
  addCategoryFailure,
  actionTypes,
  getListCategorySuccess,
  createProductSuccess,
  createProductFailure,
  getProductPaging,
  getProductPagingSuccess,
  getProductPFSSuccess,
  getProductByPCodeSuccess,
  updateProductByPCodeSuccess,
  updateProductByPCodeFailure,
} from './action';
import { push } from 'connected-react-router';
import { isRequesting, isRequested } from '../../redux/actions/config';
import {
  notifFailureMes,
  notifSuccess,
} from '../../components/notification/Notification';

function* createCategory({ category }) {
  try {
    const response = yield call(categoryApi.createCategory, category);
    yield put(addCategorySuccess(response));
    notifSuccess('Tạo danh mục mới thành công');
  } catch (e) {
    yield put(addCategoryFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* createProduct({ product }) {
  try {
    const response = yield call(productApi.createProduct, product);
    yield put(createProductSuccess());
    notifSuccess(`Tạo sản phẩm mới thành công`);
  } catch (e) {
    yield put(createProductFailure());
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getListCategory() {
  try {
    const response = yield call(categoryApi.getListCategory);
    yield put(getListCategorySuccess(response));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getProductPagingSaga({ page, limit }) {
  try {
    const response = yield call(productApi.getProductPaging, page, limit);
    yield put(getProductPagingSuccess(response.products, response.count));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getProductPFSSaga({ pfs }) {
  try {
    const response = yield call(productApi.getProductPagingFilterSorter, pfs);
    yield put(getProductPFSSuccess(response.products, response.count));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* getProductByPCodeSaga({ PCode }) {
  try {
    const response = yield call(productApi.getProductByPCode, PCode);
    yield put(getProductByPCodeSuccess(response));
  } catch (e) {
    //yield put(authFailure());
    console.log('we got error here', e);
  }
}

function* updateProductByPCodeSaga({ PCode, newProduct }) {
  try {
    const response = yield call(
      productApi.updateProductByPCode,
      PCode,
      newProduct,
    );
    yield put(updateProductByPCodeSuccess(response));
    notifSuccess(`Cập nhật thành công sản phẩm mã số ${PCode}`);
    yield put(push(`/products/${PCode}`));
  } catch (e) {
    //yield put(authFailure());
    yield put(updateProductByPCodeFailure());
    console.log('we got error here', e);
  }
}

export default function* () {
  yield takeEvery(actionTypes.ADD_CATEGORY, createCategory);
  yield takeEvery(actionTypes.CREATE_PRODUCT, createProduct);
  yield takeEvery(actionTypes.GET_LIST_CATEGORY, getListCategory);
  yield takeEvery(actionTypes.GET_PRODUCT_PAGING, getProductPagingSaga);
  yield takeEvery(
    actionTypes.GET_PRODUCT_PAGING_FILTER_SORTER,
    getProductPFSSaga,
  );
  yield takeEvery(actionTypes.GET_PRODUCT_BY_PCODE, getProductByPCodeSaga);
  yield takeEvery(
    actionTypes.UPDATE_PRODUCT_BY_PCODE,
    updateProductByPCodeSaga,
  );
}
