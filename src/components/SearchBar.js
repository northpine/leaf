import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {updateSearch, submitSearch} from '../actions';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => {
  return {
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  }
}


class SearchBar extends Component {
  state = {}

  submitIfEnter = searchFunc => (ev) => {
    if(ev.key === "Enter") {
      ev.preventDefault();
      searchFunc();
    }
  }
  render() {
    const {classes, updateSearch, submitSearch} = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(ev) => updateSearch(ev.target.value)}
          onKeyPress={this.submitIfEnter(submitSearch)}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitSearch: () => dispatch(submitSearch()),
    updateSearch: search => dispatch(updateSearch(search))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchBar));