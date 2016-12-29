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

  DELETE_PRODUCT: 'DELETE_PRODUCT',
  DELETE_PRODUCT_PENDING: 'DELETE_PRODUCT_PENDING',
  DELETE_PRODUCT_FULFILLED: 'DELETE_PRODUCT_FULFILLED',
  DELETE_PRODUCT_REJECTED: 'DELETE_PRODUCT_REJECTED'

};

export function getProducts() {
  return {type: ActionTypes.GET_PRODUCTS, payload: axios.get('/api/products')};
}

export function getProduct(productId) {
  return {
    type: ActionTypes.GET_PRODUCT,
    payload: axios.get(`/api/product/${productId}`)
  };
}

export function deleteProduct(productId) {
  return {
    type: ActionTypes.DELETE_PRODUCT,
    payload: axios.delete(`/api/products/${productId}`)
  };
}
//
// !!! important
//
// export function deleteProduct(productId) {
//   return (dispatch) => {
//     return dispatch({
//       type: ActionTypes.DELETE_PRODUCTS_PENDING,
//       payload: axios.delete(`/api/products/${productId}`)
//     }).then(() => {
//       dispatch({type: ActionTypes.DELETE_PRODUCTS_FULFILLED, payload: {
//           productId
//         }});
//     }).catch(() => {
//       dispatch({type: ActionTypes.DELETE_PRODUCTS_REJECTED, payload: {
//           productId
//         }});
//     });
//   };
// }
