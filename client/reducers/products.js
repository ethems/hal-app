import _ from 'lodash';
import {ActionTypes} from '../actions/product-action';

const products = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_FULFILLED:
      return [...action.payload.data.products];
    case ActionTypes.GET_PRODUCT_FULFILLED:
      return [action.payload.data.product];
    case ActionTypes.DELETE_PRODUCT_FULFILLED:
      {
        const {id} = action.payload.data.product;
        const index = _.findIndex(state, (product) => {
          return product.id === id;
        });
        if (index > -1) {
          return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
          ];
        }
        return state;
      }
    default:
      return state;
  }
};

export default products;
