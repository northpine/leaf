import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import theme from './components/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Content from './components/Content';
class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position='sticky' color='primary'>
              <Toolbar>
                Pine
              </Toolbar>
            </AppBar>
            <Content />
        </MuiThemeProvider>
    );
  }
}

export default App;
