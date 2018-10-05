import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import extent from './extent';
export default combineReducers({
  search: search,
  results: results,
  extent: extent
})