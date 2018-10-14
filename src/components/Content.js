import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
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
        <Grid container spacing={0}>
          <Grid item xs={4} spacing={0}> 
            <Paper className={classes.paper}>
              <ResultList />
            </Paper>
          </Grid>
          <Grid item xs={8} spacing={0}>
            <PineMap />
          </Grid>
        </Grid>
      
    )
  }
}


export default connect()(withStyles(styles)(Content))