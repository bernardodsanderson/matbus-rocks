import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { blueGrey500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
  },
  appBar: {
    height: 50,
  },
});

const FinalApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

render(
  <FinalApp />,
  document.getElementById('root')
);
