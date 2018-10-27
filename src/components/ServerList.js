import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {updateOpenServer, closeServer, highlightLayer, unHighlightLayer, updateSelectedLayer} from '../actions'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Description from './Description'
import OpenInNew from "@material-ui/icons/OpenInNew";
import IconButton from '@material-ui/core/IconButton';
import { openInNewTab } from '../utils';
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
    padding: 0,
  }
})

class ServerList extends React.Component {

  onLayerClick = url => () => {
    this.props.selectLayer(url, this.props.selected !== url);
  }

  onLayerMouseEnter = url => () => {
    this.props.highlightLayer(url);
  }

  onLayerMouseLeave = url => () => {
      this.props.unHighlightLayer(url); 
  }

  render() {
    const {layers, url, isOpen, classes, closeServer, openServer, layerData, selected} = this.props;

    return (
      <div>
        <ListItem button dense
          onClick={() => isOpen ? closeServer() : openServer()} >
          <ListItemText primary={url}/>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <List component="div" disablePadding dense>
            {layers.map(layer => {
              return (
                <ListItem button className={classes.nested}
                dense
                key={layer.url}
                selected={selected === layer.url}
                onClick={this.onLayerClick(layer.url)}
                onMouseLeave={this.onLayerMouseLeave(layer.url)}
                onMouseEnter={this.onLayerMouseEnter(layer.url)}
                >
                  <ListItemText inset primary={layer.name}/>

                  <Description text={layerData[layer.url].properties.description}/>
                  <IconButton onClick={openInNewTab(layer.url)}>
                    <OpenInNew />
                  </IconButton>
                  
                </ListItem>
              )
            })}
          </List>
        </Collapse>
        
      </div>
    )

  }
}


const mapStateToProps = (state, ownProps) => {
  const { servers, layers } = state.results;
  const { url } = ownProps;
  return {
    layers: servers[url],
    isOpen: state.open === url,
    layerData: layers,
    highlight: state.highlight,
    selected: state.selected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {url} = ownProps;
  return {
    closeServer: () => dispatch(closeServer(url)),
    openServer: () => dispatch(updateOpenServer(url)),
    selectLayer: (url, select) => dispatch(updateSelectedLayer(url, select)),
    highlightLayer: (layerUrl) => dispatch(highlightLayer(layerUrl)),
    unHighlightLayer: (layerUrl) => dispatch(unHighlightLayer(layerUrl))
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ServerList));