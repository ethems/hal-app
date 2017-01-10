import axios from 'axios';

export const ActionTypes = {
  GET_PRICE_UNITS: 'GET_PRICE_UNITS',
  GET_PRICE_UNITS_PENDING: 'GET_PRICE_UNITS_PENDING',
  GET_PRICE_UNITS_FULFILLED: 'GET_PRICE_UNITS_FULFILLED',
  GET_PRICE_UNITS_REJECTED: 'GET_PRICE_UNITS_REJECTED',

  GET_PRICE_TIMELINES: 'GET_PRICE_TIMELINES',
  GET_PRICE_TIMELINES_PENDING: 'GET_PRICE_TIMELINES_PENDING',
  GET_PRICE_TIMELINES_FULFILLED: 'GET_PRICE_TIMELINES_FULFILLED',
  GET_PRICE_TIMELINES_REJECTED: 'GET_PRICE_TIMELINES_REJECTED'
};

export function getPriceUnits() {
  return {type: ActionTypes.GET_PRICE_UNITS, payload: axios.get('/api/prices/units')};
}

export function getPriceTimelines(productId, timespanType) {
  return {type: ActionTypes.GET_PRICE_TIMELINES, payload: axios.get(`/api/prices/${productId}/${timespanType}`)};
}
