import _ from 'lodash';
import {ActionTypes} from '../actions/product-action';

const initialState = {
  isLoading: false,
  data: []
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_PENDING:
      return Object.assign({}, state, {isLoading: true});
    case ActionTypes.GET_PRODUCTS_FULFILLED:
      return Object.assign({}, state, {
        data: [...action.payload.data.products],
        isLoading: false
      });
    case ActionTypes.GET_PRODUCT_FULFILLED:
      return Object.assign({}, state, {
        data: [action.payload.data.product],
        isLoading: false
      });
    case ActionTypes.RESET_PRODUCTS_FULFILLED:
      return Object.assign({}, state, {
        data: [],
        isLoading: false
      });
    case ActionTypes.DUPLICATE_PRODUCT_FULFILLED:
      return Object.assign({}, state, {
        data: [
          ...state.data,
          action.payload.data.product
        ],
        isLoading: false
      });
    case ActionTypes.DELETE_PRODUCT_FULFILLED:
      {
        const {id} = action.payload.data.product;
        const index = _.findIndex(state, product => product.id === id);
        if (index > -1) {
          return Object.assign({}, state, {
            data: [
              ...state.data.slice(0, index),
              ...state.data.slice(index + 1)
            ],
            isLoading: false
          });
        }
        return state;
      }
    default:
      return state;
  }
};

export default products;
