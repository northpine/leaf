import {REPLACE_RESULTS} from '../constants';

export default (state = {}, action) => {
  switch(action.type) {
    case REPLACE_RESULTS:
      return Object.assign({}, action.results)
    default:
      return state
  }
}