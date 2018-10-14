import {UPDATE_SEARCH, REPLACE_RESULTS, UPDATE_EXTENT, UPDATE_OPEN_SERVER, CLOSE_SERVER, UPDATE_HIGHLIGHTED_LAYER} from '../constants';
import axios from 'axios';
export const updateSearch = (searchString) => {
  return {
    type: UPDATE_SEARCH,
    searchString: searchString
  }
}

export const replaceResults = (results) => {
  return {
    type: REPLACE_RESULTS,
    results: results
  }
}

export const updateExtent = (extent) => {
  return {
    type: UPDATE_EXTENT,
    extent: extent
  }
}

export const updateOpenServer = (url) => {
  return {
    type: UPDATE_OPEN_SERVER,
    server: url
  }
}

export const closeServer = (url) => {
  return {
    type: CLOSE_SERVER,
    server: url
  }
}

export const highlightLayer = (url) => {
  return {
    type: UPDATE_HIGHLIGHTED_LAYER,
    url: url,
    highlight: true
  }
}

export const unHighlightLayer = (url) => {
  return {
    type: UPDATE_HIGHLIGHTED_LAYER,
    url: url,
    highlight: false
  }
}

export const submitSearch = () => {
  return async (dispatch, getState) => {
    const {search, extent} = getState();
    const {xmin, ymin, xmax, ymax} = extent;
    console.log(extent);
    const result = await axios.get(`https://pine.center/get?phrase=${search}&xmin=${xmin}&ymin=${ymin}&xmax=${xmax}&ymax=${ymax}`);
    console.log(result);
    dispatch(replaceResults(result.data.message))
  }
}