import {UPDATE_EXTENT, DEFAULT_EXTENT} from '../constants';



export default (state = DEFAULT_EXTENT, action) => {
  switch(action.type) {
    case UPDATE_EXTENT:
      return Object.assign({}, state, action.extent)
    default:
      return state
  }
}