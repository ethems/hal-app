import {ActionTypes} from '../actions/price-action';

const products = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_PRICE_UNITS_FULFILLED:
      return [...action.payload.data.units];
    default:
      return state;
  }
};

export default products;
