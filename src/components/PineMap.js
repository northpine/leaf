import React from 'react'
import { compose, withProps } from "recompose"
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import GoogleMap from 'react-google-maps/lib/components/GoogleMap';
import Polygon from 'react-google-maps/lib/components/Polygon';
import {connect} from 'react-redux';
import {updateExtent} from '../actions';

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
    highlighted: state.highlight.url
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateExtent: extent => dispatch(updateExtent(extent))
  }
}


const PineMap = withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(class Map extends React.Component {
  state = {}
  onMapMounted = (ref) => {
    if(!this.state.map) {
      this.setState({map: ref})
    }
  }
  onBoundsChanged = () => {
    if(this.state.map) {
      const bounds = this.state.map.getBounds();
      //Google maps is weird...
      const extent = {
        xmin: bounds.b.b,
        ymin: bounds.f.b,
        xmax: bounds.b.f,
        ymax: bounds.f.f
      }
      this.props.updateExtent(extent);
    }
  }
  render() {
    const { highlighted, layers = [] } = this.props;
    let hLayerPolygon;
    if(highlighted) {
      const hLayer = layers[highlighted];
      const hBox = convertGeoToLatLng(hLayer.geometry.coordinates[0]);
      hLayerPolygon = (
        <Polygon key={highlighted} paths={[hBox]} options={{
          fillColor: "red",
          fillOpacity: 0.10,
          strokeColor: "red",
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
        />
      )
    }

    return (
      <GoogleMap {...this.props} 
        defaultCenter={{lat: 47, lng: -122}}
        defaultZoom={8}
        onBoundsChanged={this.onBoundsChanged}
        ref={this.onMapMounted}
      >
        {Object.keys(layers).filter(key => highlighted !== key).map(key => layers[key]).map(layer => {
          const {geometry} = layer;
          
          const box = convertGeoToLatLng(geometry.coordinates[0]);
          return (
            <Polygon key={layer.properties.url} paths={[box]} options={{
              fillColor: `gray`,
              fillOpacity: 0,
              strokeColor: `gray`,
              strokeOpacity: 1,
              strokeWeight: 1,
            }} />
          )
        })}
        {hLayerPolygon}
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
