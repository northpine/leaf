import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {updateOpenServer, closeServer, highlightLayer, unHighlightLayer} from '../actions'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Description from './Description'

import { openInNewTab } from '../utils';
const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
})

class ServerList extends React.Component {

  state = {
    openIndex: -1
  }

  render() {
    const {layers, url, isOpen, classes, closeServer, openServer, highlightLayer, unHighlightLayer, layerData} = this.props;

    return (
      <div>
        <ListItem button 
          onClick={() => isOpen ? closeServer() : openServer()} >
          <ListItemText primary={url}/>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <List component="div" disablePadding>
            {layers.map(layer => {
              return (
                <ListItem button className={classes.nested}
                onMouseEnter={highlightLayer(layer.url)}
                onMouseLeave={unHighlightLayer(layer.url)}>
                  <ListItemText inset primary={layer.name} onClick={openInNewTab(layer.url)}/>
                  <ListItemSecondaryAction>
                    <Description text={layerData[layer.url].properties.description}/>
                  </ListItemSecondaryAction>
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
    highlighted: state.highlighted
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {url} = ownProps;
  return {
    closeServer: () => dispatch(closeServer(url)),
    openServer: () => dispatch(updateOpenServer(url)),
    highlightLayer: layerUrl => () => dispatch(highlightLayer(layerUrl)),
    unHighlightLayer: layerUrl => () => dispatch(unHighlightLayer(layerUrl))
  }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ServerList));