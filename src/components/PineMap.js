import React from 'react'
import { compose, withProps } from "recompose"
import withScriptjs from 'react-google-maps/lib/withScriptjs'
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import {GoogleMap} from 'react-google-maps';
import {connect} from 'react-redux';
import {updateExtent} from '../actions';

const mapStateToProps = (state) => {
  return {
    extent: state.extent,
    results: state.results
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
    } else {
      console.log('bounds changed');
    }
  }
  render() {
    return (
      <GoogleMap {...this.props} 
        defaultCenter={{lat: 47, lng: -122}}
        defaultZoom={8}
        onBoundsChanged={this.onBoundsChanged}
        ref={this.onMapMounted}
      >
      </GoogleMap>
    )
  }
})))

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCnsXL4I-KASiPslRKoo59ojStoDr9LjQU",
  loadingElement: <div style={{ height: `95%` }} />,
  containerElement: <div style={{ height: `500px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}))(PineMap)
