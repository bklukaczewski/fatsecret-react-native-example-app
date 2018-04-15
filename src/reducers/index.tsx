import {combineReducers} from 'redux';

import {nav} from './nav';
import {search} from './search';

const AppReducer = combineReducers({
  nav,
  search,
});

export default AppReducer;
