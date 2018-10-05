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
    layers: state.results.features
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
    const layers = this.props.layers || [];
    return (
      <GoogleMap {...this.props} 
        defaultCenter={{lat: 47, lng: -122}}
        defaultZoom={8}
        onBoundsChanged={this.onBoundsChanged}
        ref={this.onMapMounted}
      >
        {layers.map(layer => {
          const {geometry} = layer;
          
          const box = convertGeoToLatLng(geometry.coordinates[0]);
          return (
            <Polygon key={layer.properties.url} paths={[box]} options={{
              fillColor: `red`,
              fillOpacity: 0.20,
              strokeColor: `red`,
              strokeOpacity: 1,
              strokeWeight: 1,
            }} />
          )
        })}
      </GoogleMap>
    )
  }
})))

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCnsXL4I-KASiPslRKoo59ojStoDr9LjQU",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `450px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}))(PineMap)
