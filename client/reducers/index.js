import {combineReducers} from 'redux';
import products from './products';
import priceUnits from './price-units';

export default combineReducers({products, priceUnits});
