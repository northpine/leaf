import React from 'react';
import {connect} from 'react-redux';
import ServerList from './ServerList';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';



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
              return <ServerList key={server} url={server} />
            })}
          </List>
        </div>
      )
    } else {
      return "Nothing loaded"
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