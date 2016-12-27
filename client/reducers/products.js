import _ from 'lodash';
import {ActionTypes} from '../actions/product-action';

const products = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_PENDING:
      return state;
    case ActionTypes.GET_PRODUCTS_FULFILLED:
      return [...action.payload.data.products];
    case ActionTypes.GET_PRODUCTS_REJECTED:
      return state;
    case ActionTypes.DELETE_PRODUCTS_PENDING:
      return state;
    case ActionTypes.DELETE_PRODUCTS_FULFILLED:
      {
        const {_id} = action.payload.data.product;
        const index = _.findIndex(state, (product) => {
          return product._id === _id
        });
        if (index > -1) {
          return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
          ];
        }
        return state;
      }
    case ActionTypes.DELETE_PRODUCTS_REJECTED:
      return state;
    default:
      return state;
  }
};

export default products;
