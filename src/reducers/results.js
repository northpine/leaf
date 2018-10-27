import {REPLACE_RESULTS} from '../constants';
import { shortenUrl } from '../utils';

export default (state = {}, action) => {
  switch(action.type) {
    case REPLACE_RESULTS:

      const {features} = action.results;
      //We're going to group by server here.
      const serverList = {};
      const layerList = {};
      if(features) {
        features.sort().forEach((feature) => {
          if(feature && feature.properties) {
            const layerUrl = feature.properties.url;
            const baseUrl = shortenUrl(layerUrl);
            if(!serverList[baseUrl]) {
              serverList[baseUrl] = [];
            }
            layerList[layerUrl] = feature;
            serverList[baseUrl].push({
              url: layerUrl,
              name: feature.properties.name
            });
          }
        });
      }
      return Object.assign({}, {
        servers: serverList,
        layers: layerList
      });
    default:
      return state
  }
}