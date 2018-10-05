import React, {Component} from 'react';
import Bar from 'material-ui-search-bar';
import {connect} from 'react-redux';
import {updateSearch, submitSearch} from '../actions';

class SearchBar extends Component {
  state = {}
  render() {
    return (
      <Bar 
        onRequestSearch={this.props.onSubmit}
        value={this.props.search}
        onChange={this.props.updateSearch}
      />
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
    onSubmit: () => dispatch(submitSearch()),
    updateSearch: search => dispatch(updateSearch(search))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);