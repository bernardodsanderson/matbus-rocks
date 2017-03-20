import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import { blueGrey500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './index.css';

// http://165.234.255.87:8080/feed/vehicle/byRoutes/14
// http://165.234.255.87:8080/fixedroute/

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
  },
  appBar: {
    height: 50,
  },
});

class App extends React.Component {

  constructor() {
    super();
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      route: '01',
      zoom: 16,
      location: [46.8695, -96.7901],
      open: false
    }
  }

  callAPI() {
    let _this = this;
    axios.get('http://165.234.255.87:8080/feed/vehicle/byRoutes/14', {
      'Content-Type': 'application/json',
    })
    .then(function (response) {
      console.log(response.data.data[0].latitude);
      _this.setState({open: true, zoom: 16, location: [response.data.data[0].latitude, response.data.data[0].longitude]});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {

    this.callAPI();

    const ButtonTest = <RaisedButton label="Toggle Drawer"  onTouchTap={this.handleToggle} />;

    const drawer = <Drawer open={this.state.open}><MenuItem>Menu Item</MenuItem><MenuItem>Menu Item 2</MenuItem></Drawer>;

    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar title="Matbus Rocks!" iconElementLeft={ButtonTest} />
        </MuiThemeProvider>

        <Map center={this.state.location} zoom={this.state.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={this.state.location}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.{this.state.open ? 'true':'false'}</span>
            </Popup>
          </Marker>
        </Map>

      </div>
    );
  }
}

export default App;
