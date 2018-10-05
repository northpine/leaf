import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import ResultList from './ResultList';
import PineMap from './PineMap';
import {connect} from 'react-redux';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Content extends React.Component {
  render() {
    const {classes} = this.props;
    return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <SearchBar />
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <PineMap />
            </Paper>
          </Grid>
          <Grid item xs={6}> 
            <Paper className={classes.paper}>
              <ResultList />
            </Paper>
          </Grid>
        </Grid>
      
    )
  }
}


export default connect()(withStyles(styles)(Content))