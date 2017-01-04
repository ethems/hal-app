import axios from 'axios';

export const ActionTypes = {
  GET_PRICE_UNITS: 'GET_PRICE_UNITS',
  GET_PRICE_UNITS_PENDING: 'GET_PRICE_UNITS_PENDING',
  GET_PRICE_UNITS_FULFILLED: 'GET_PRICE_UNITS_FULFILLED',
  GET_PRICE_UNITS_REJECTED: 'GET_PRICE_UNITS_REJECTED'
};

export function getPriceUnits() {
  return {type: ActionTypes.GET_PRICE_UNITS, payload: axios.get('/api/price/units')};
}
