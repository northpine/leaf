import { UPDATE_OPEN_SERVER, CLOSE_SERVER } from "../constants";


export default (state = "", action) => {
  switch(action.type) {
    case UPDATE_OPEN_SERVER:
      return action.server
    case CLOSE_SERVER:
      return ""
    default:
      return state
  }
}