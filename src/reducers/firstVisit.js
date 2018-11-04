import { SET_FIRST_VIST } from "../constants";

export default (state = true, action) => {
  switch(action.type) {
    case SET_FIRST_VIST:
      return action.isFirst
    default:
      return state
  }
}