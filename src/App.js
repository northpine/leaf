import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import theme from './components/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import SearchBar from './components/SearchBar';
import {Provider} from 'react-redux';
import ResultList from './components/ResultList';
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
            <AppBar position='sticky' color='primary'>
              <Toolbar>
                Pine
              </Toolbar>
            </AppBar>
          <Provider store={this.props.store}>
            <SearchBar />
          </Provider>
          <Provider store={this.props.store}>
            <ResultList />
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
