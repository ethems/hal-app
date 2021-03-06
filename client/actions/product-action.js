import axios from 'axios';

export const ActionTypes = {
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCTS_PENDING: 'GET_PRODUCTS_PENDING',
  GET_PRODUCTS_FULFILLED: 'GET_PRODUCTS_FULFILLED',
  GET_PRODUCTS_REJECTED: 'GET_PRODUCTS_REJECTED',

  GET_PRODUCT: 'GET_PRODUCT',
  GET_PRODUCT_PENDING: 'GET_PRODUCT_PENDING',
  GET_PRODUCT_FULFILLED: 'GET_PRODUCT_FULFILLED',
  GET_PRODUCT_REJECTED: 'GET_PRODUCT_REJECTED',

  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_PENDING: 'UPDATE_PRODUCT_PENDING',
  UPDATE_PRODUCT_FULFILLED: 'UPDATE_PRODUCT_FULFILLED',
  UPDATE_PRODUCT_REJECTED: 'UPDATE_PRODUCT_REJECTED',

  DELETE_PRODUCT: 'DELETE_PRODUCT',
  DELETE_PRODUCT_PENDING: 'DELETE_PRODUCT_PENDING',
  DELETE_PRODUCT_FULFILLED: 'DELETE_PRODUCT_FULFILLED',
  DELETE_PRODUCT_REJECTED: 'DELETE_PRODUCT_REJECTED',

  DUPLICATE_PRODUCT: 'DUPLICATE_PRODUCT',
  DUPLICATE_PRODUCT_PENDING: 'DUPLICATE_PRODUCT_PENDING',
  DUPLICATE_PRODUCT_FULFILLED: 'DUPLICATE_PRODUCT_FULFILLED',
  DUPLICATE_PRODUCT_REJECTED: 'DUPLICATE_PRODUCT_REJECTED',

  RESET_PRODUCTS: 'RESET_PRODUCTS',
  RESET_PRODUCTS_PENDING: 'RESET_PRODUCTS_PENDING',
  RESET_PRODUCTS_FULFILLED: 'RESET_PRODUCTS_FULFILLED'
};

export function getProducts(props = {}) {
  const withRate = props.withRate || false;
  const justActive = props.justActive || false;
  return {
    type: ActionTypes.GET_PRODUCTS,
    payload: axios.get(`/api/products?withrate=${withRate}&justactive=${justActive}`)
  };
}

export function resetProducts(callback) {
  return dispatch => dispatch({
    type: ActionTypes.RESET_PRODUCTS,
    payload: new Promise((res) => {
      setTimeout(() => {
        res()
      }, 1);
    })
  }).then(() => {
    callback && callback();
  });
}

export function getProduct(productId) {
  return {
    type: ActionTypes.GET_PRODUCT,
    payload: axios.get(`/api/products/${productId}`)
  };
}

export function updateProduct(productId, product, callback) {
  return dispatch => dispatch({
    type: ActionTypes.UPDATE_PRODUCT_PENDING,
    payload: axios.put('/api/product', Object.assign({}, product, {id: productId}))
  }).then((res) => {
    dispatch({type: ActionTypes.UPDATE_PRODUCT_FULFILLED, payload: res.value});
    callback && setTimeout(() => callback(), 1);
  }).catch((res) => {
    dispatch({type: ActionTypes.UPDATE_PRODUCT_REJECTED, payload: res.value});
  });
}

export function deleteProduct(productId) {
  return {
    type: ActionTypes.DELETE_PRODUCT,
    payload: axios.delete(`/api/products/${productId}`)
  };
}

export function duplicateProduct(productId) {
  return {
    type: ActionTypes.DUPLICATE_PRODUCT,
    payload: axios.post(`/api/products/${productId}/duplicate`)
  };
}
