import { UDPATE_SELECTED_LAYER } from "../constants";

export default (state = "", action) => {
  switch(action.type) {
    case UDPATE_SELECTED_LAYER:
      return (action.select) ? action.url : ""
    default:
      return state
  }
}