import { combineReducers } from 'redux';
import search from './search';
import results from './results';
import extent from './extent';
import open from './open';
import highlight from './highlight';
import select from './select';
import isFirstVisit from './firstVisit';
export default combineReducers({
  search: search,
  results: results,
  extent: extent,
  open: open,
  highlight: highlight,
  selected: select,
  isFirstVisit: isFirstVisit
})