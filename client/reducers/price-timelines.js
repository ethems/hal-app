import _ from 'lodash';
import {ActionTypes} from '../actions/price-action';

const priceTimelines = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_PRICE_TIMELINES_FULFILLED:
      {
        const priceData = action.payload.data;
        const foundIndex = _.findIndex(state, obj => obj.productId === priceData.productId && obj.timespanType === priceData.timespanType);
        if (foundIndex === -1) {
          return [
            ...state,
            priceData
          ];
        }
        return [
          ...state.slice(0, foundIndex),
          priceData,
          ...state.slice(foundIndex + 1)
        ];
      }
    default:
      return state;
  }
};

export default priceTimelines;

//  ********************
//  HELPER FUNCTIONS
//  ********************
export const getActiveTimeline = (state, productId, timespanType) => {
  if (productId && timespanType) {
    return _.find(state, (priceTimeline => priceTimeline.productId === productId && priceTimeline.timespanType === timespanType));
  }
  return null;
};
