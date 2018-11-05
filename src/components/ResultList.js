import React from 'react';
import {connect} from 'react-redux';
import ServerList from './ServerList';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '87vh',
  },
});

class ResultList extends React.Component {
  render() {
    const {servers, classes} = this.props;
    if(servers) {
      return (
        <div className={classes.root}>
          <List component="nav">
              {Object.keys(servers).map(server => {
                return (
                  <div>
                    <ServerList key={server} url={server} />
                    <Divider />
                  </div>
                );
              })}
          </List>
        </div>
      )
    } else {
      return "You can search for data sources by moving the map and entering keywords in the searchbar"
    }
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    servers: state.results.servers
  }

}

const mapStateToDispatch = (dispatch, ownProps) => {
  return {}
}


export default withStyles(styles)(connect(mapStateToProps, mapStateToDispatch)(ResultList));