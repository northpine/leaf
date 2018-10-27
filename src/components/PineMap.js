import React from 'react'
import { compose, withProps } from "recompose"
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import Polygon from 'react-google-maps/lib/components/Polygon';
import {connect} from 'react-redux';
import {updateExtent, updateOpenServer, updateSelectedLayer} from '../actions';
import { shortenUrl } from '../utils';

const convertGeoToLatLng = (points) => {
  return points.map(arr => {
    /*eslint-disable no-undef*/
    return new google.maps.LatLng(arr[1], arr[0]);
    /*eslint-enable no-undef*/
  })
}

const mapStateToProps = (state) => {
  return {
    extent: state.extent,
    layers: state.results.layers,
    highlighted: state.highlight.url,
    selected: state.selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateExtent: extent => dispatch(updateExtent(extent)),
    updateSelectedLayer: (url, select) => dispatch(updateSelectedLayer(url, select)),
    openServer: url => dispatch(updateOpenServer(url))
  }
}

class PinePolygon extends React.Component {
  render() {
    const {geometry, onPolygonClick, color, fill, url} = this.props;
    const box = convertGeoToLatLng(geometry.coordinates[0]);
    return (
      <Polygon key={url} paths={[box]} 
        onClick={onPolygonClick}
        options={{
          fillColor: color,
          fillOpacity: fill,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 1
        }} />
    )
  }
}


const PineMap = withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(class Map extends React.Component {
  state = {}
  onMapMounted = (ref) => {
    this.setState({map: ref})
  }
  onBoundsChanged = (ev) => {
    const {map} = this.state;
    if(map) {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      const extent = {
        xmin: southWest.lng(),
        ymin: southWest.lat(),
        xmax: northEast.lng(),
        ymax: northEast.lat()
      }
      
      this.props.updateExtent(extent);
    }
  }
  render() {
    const { highlighted, selected, layers = [] } = this.props;

    const onPolygonClick = url => () => {
      this.props.updateSelectedLayer(url, selected !== url);
      this.props.openServer(shortenUrl(url));
    }

    return (
      <GoogleMap {...this.props} 
        defaultCenter={{lat: 47, lng: -122}}
        defaultZoom={8}
        onBoundsChanged={this.onBoundsChanged}
        ref={this.onMapMounted}
      >
        {Object.keys(layers).map(key => layers[key]).map((layer) => {
          const {url} = layer.properties;
          const color = selected === url ? `red` : highlighted === url ? `blue` : `gray`;
          const fill = selected === url || highlighted === url ? 0.10 : 0;
          return (
            <PinePolygon onPolygonClick={onPolygonClick(layer.properties.url)}
              key={layer.properties.url}
              color={color}
              geometry={layer.geometry}
              fill={fill}
              url={url}
            />
          )
        })}
      </GoogleMap>
    )
  }
})))

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCnsXL4I-KASiPslRKoo59ojStoDr9LjQU",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `92vh` }} />,
  mapElement: <div style={{ height: `92vh` }} />,
}))(PineMap)
