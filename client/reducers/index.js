import {combineReducers} from 'redux';
import _ from 'lodash';
import products from './products';
import priceUnits from './price-units';
import priceTimelines from './price-timelines';

export default combineReducers({products, priceUnits, priceTimelines});

// HELPER FUNCTIONS
/*
    =====TIMELINE======
*/
export const getActiveTimeline = (state, productId, timespanType) => {
  if (productId && timespanType) {
    return _.find(state.priceTimelines, (priceTimeline => priceTimeline.productId === productId && priceTimeline.timespanType === timespanType));
  }
  return null;
};
