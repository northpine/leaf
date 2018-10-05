import {UPDATE_SEARCH} from '../constants'


export default (state = "", action) => {
    switch(action.type) {
      case UPDATE_SEARCH:
        return action.searchString
      default:
        return state
    }
}