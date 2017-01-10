import {combineReducers} from 'redux';
import products from './products';
import priceUnits from './price-units';
import priceTimelines from './price-timelines';

export default combineReducers({products, priceUnits, priceTimelines});
