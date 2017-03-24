import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import './index.css';
import './logo.svg';

// http://165.234.255.87:8080/feed/vehicle/byRoutes/14
// http://165.234.255.87:8080/fixedroute/

class App extends React.Component {

  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.mapClose = this.mapClose.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.state = {
      route: '',
      bus: '',
      zoom: 12,
      location: [46.8695, -96.7901],
      open: false,
      value: 1,
      once: true,
      snackbar: false
    }
  }

  callAPI(route_number, bus_number) {
    // console.log(route_number, bus_number);
    let _this = this;
    axios.get('http://165.234.255.87:8080/feed/vehicle/byRoutes/'+route_number, {
      'Content-Type': 'application/json',
    })
    .then(function (response) {
      // console.log(response);
      if (response.data.data.length < 0) {
        console.log('not working!');
        _this.openSnackbar();
        return 0;
      } else {
        if (response.data.data[bus_number].latitude !== undefined && response.data.data[bus_number].longitude !== undefined) {
          // console.log(response.data.data[bus_number].latitude, response.data.data[bus_number].longitude);
          _this.setState({zoom: 16, location: [response.data.data[bus_number].latitude, response.data.data[bus_number].longitude], once: false});
          _this.callAPI(_this.state.route, _this.state.bus);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose(event, bus_number) { 
    this.setState({open: false, route: event, once: true, bus: bus_number});
    this.callAPI(this.state.route, this.state.bus);
  }

  mapClose() {
    this.setState({open: false});
  }

  openSnackbar() {
    this.setState({snackbar: true});
  }

  closeSnackbar() {
    this.setState({snackbar: false});
  }

  render() {

    const ButtonTest = <FlatButton className="routes" onClick={this.handleToggle} label="Routes" />;

    const bus = <i className="material-icons">directions_bus</i>;

    let route = '';
    
    if (this.state.route) {
      route = <span className="route-indicator">Route: {this.state.route} | Bus: {this.state.bus + 1}</span>;
    } else {
      route = <span></span>;
    }

    return (
      <div className="App">

        <AppBar title={bus} iconElementLeft={route} iconElementRight={ButtonTest} />

        <Drawer open={this.state.open}>
          <MenuItem onClick={()=>this.handleClose("0%20-%20LinkFM", 0)} >LinkFM</MenuItem>
          <MenuItem onClick={()=>this.handleClose("01", 0)} >Route 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("02", 0)} >Route 2 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("02", 1)} >Route 2 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("03", 0)} >Route 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("04", 0)} >Route 4 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("04", 1)} >Route 4 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("05", 0)} >Route 5</MenuItem>
          <MenuItem onClick={()=>this.handleClose("06", 0)} >Route 6</MenuItem>
          <MenuItem onClick={()=>this.handleClose("07", 0)} >Route 7</MenuItem>
          <MenuItem onClick={()=>this.handleClose("08", 0)} >Route 8</MenuItem>
          <MenuItem onClick={()=>this.handleClose("09", 0)} >Route 9</MenuItem>
          <MenuItem onClick={()=>this.handleClose("10", 0)} >Route 10</MenuItem>
          <MenuItem onClick={()=>this.handleClose("11", 0)} >Route 11</MenuItem>
          <MenuItem onClick={()=>this.handleClose("12", 0)} >Route 12</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13", 0)} >Route 13 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13", 1)} >Route 13 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13U", 0)} >Route 13U</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 0)} >Route 14 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 1)} >Route 14 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 2)} >Route 14 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 0)} >Route 15 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 1)} >Route 15 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 2)} >Route 15 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 3)} >Route 15 | Bus 4</MenuItem>
          <MenuItem onClick={()=>this.handleClose("16", 0)} >Route 16</MenuItem>
          <MenuItem onClick={()=>this.handleClose("17", 0)} >Route 17</MenuItem>
          <MenuItem onClick={()=>this.handleClose("18", 0)} >Route 18 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("18", 1)} >Route 18 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("23", 0)} >Route 23</MenuItem>
          <MenuItem onClick={()=>this.handleClose("31", 0)} >Route 31</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32E", 0)} >Route 32E</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32W", 0)} >Route 32W</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 0)} >Route 33 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 1)} >Route 33 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 2)} >Route 33 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("34", 0)} >Route 34</MenuItem>
          <MenuItem onClick={()=>this.handleClose("35", 0)} >Route 35</MenuItem>
        </Drawer>

        <Map center={this.state.location} zoom={this.state.zoom} onClick={this.mapClose}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={this.state.location}>
            <Popup>
              <span>This is route: {this.state.route}</span>
            </Popup>
          </Marker>
        </Map>

        <Snackbar
          open={this.state.snackbar}
          message='No bus on this route is running right now!'
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
          className="snackbar"
        />

      </div>
    );
  }
}

export default App;
