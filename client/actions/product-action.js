import axios from 'axios';

export const ActionTypes = {
  GET_PRODUCTS: 'GET_PRODUCTS',
  GET_PRODUCTS_PENDING: 'GET_PRODUCTS_PENDING',
  GET_PRODUCTS_FULFILLED: 'GET_PRODUCTS_FULFILLED',
  GET_PRODUCTS_REJECTED: 'GET_PRODUCTS_REJECTED',

  DELETE_PRODUCTS: 'DELETE_PRODUCTS',
  DELETE_PRODUCTS_PENDING: 'DELETE_PRODUCTS_PENDING',
  DELETE_PRODUCTS_FULFILLED: 'DELETE_PRODUCTS_FULFILLED',
  DELETE_PRODUCTS_REJECTED: 'DELETE_PRODUCTS_REJECTED'
};

export function getProducts() {
  return {type: ActionTypes.GET_PRODUCTS, payload: axios.get('/api/products')};
}

export function deleteProduct(productId){
  return {type: ActionTypes.DELETE_PRODUCTS, payload: axios.delete(`/api/products/${productId}`)};
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
