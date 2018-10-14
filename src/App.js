import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import theme from './components/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Content from './components/Content';
import Navbar from './components/Navbar';
class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position='sticky' color='primary'>
              <Navbar />
            </AppBar>
            <Content />
        </MuiThemeProvider>
    );
  }
}

export default App;
