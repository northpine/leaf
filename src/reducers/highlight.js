import { UPDATE_HIGHLIGHTED_LAYER } from "../constants";

export default (state = {}, action) => {
  switch(action.type) {
    case UPDATE_HIGHLIGHTED_LAYER:
      if(action.highlight) {
        return Object.assign({}, {url: action.url});
      } else {
        return {
          url: ""
        }
      }
    default:
      return state
  }
}