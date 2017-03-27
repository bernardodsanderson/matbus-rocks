import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';

import { polyline00, polyline01, polyline02, polyline03, polyline04, polyline05, polyline06, polyline08, polyline09, polyline11, polyline13, polyline13U, polyline14, polyline15, polyline16, polyline17, polyline18, polyline23, polyline31, polyline32E, polyline32W, polyline33, polyline34, polyline35 } from './routes.js';
import './index.css';
import './logo.svg';

// http://165.234.255.87:8080/feed/vehicle/byRoutes/14
// http://165.234.255.87:8080/fixedroute/
// http://www.openrouteservice.org
// http://map.project-osrm.org/?z=17&center=46.874476%2C-96.769863&loc=46.873879%2C-96.768329&loc=46.872800%2C-96.773994&hl=en&alt=0
// https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old

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
      once: false,
      snackbar: false,
      polyline: []
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
      if (response.data.data.length < 1) {
        _this.setState({zoom: 12, location: [46.8695, -96.7901], once: false, route: '', bus: ''});
        // console.log('not working!');
        _this.openSnackbar();
        return 0;
      } else {
        // console.log(response.data.data[bus_number].latitude, response.data.data[bus_number].longitude);
        _this.setState({zoom: 16, location: [response.data.data[bus_number].latitude, response.data.data[bus_number].longitude], once: true});
        _this.callAPI(_this.state.route, _this.state.bus);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose(event, bus_number, polyline) { 
    this.setState({open: false, route: event, once: false, bus: bus_number, polyline: polyline});
    this.callAPI(event, bus_number);
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

    let marker = '';
    let polyline = '';

    // this.state.route && this.state.once

    if (true) {
      marker = <Marker position={this.state.location}><Popup><span>Route: {this.state.route}</span></Popup></Marker>;
      polyline = <Polyline color='#607d8b' positions={this.state.polyline} />;
    }

    let route = '';
    
    if (this.state.route) {
      if (this.state.route === '0%20-%20LinkFM') {
        route = <span className="route-indicator">Route: LinkFM | Bus: {this.state.bus + 1}</span>;
      } else {
        route = <span className="route-indicator">Route: {this.state.route} | Bus: {this.state.bus + 1}</span>;
      }
    } else {
      route = <span></span>;
    }

    // console.log(this.state.polyline);

    return (
      <div className="App">

        <AppBar title={bus} iconElementLeft={route} iconElementRight={ButtonTest} />

        <Drawer open={this.state.open}>
          <MenuItem onClick={()=>this.handleClose("0%20-%20LinkFM", 0, polyline00)} >LinkFM</MenuItem>
          <MenuItem onClick={()=>this.handleClose("01", 0, polyline01)} >Route 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("02", 0, polyline02)} >Route 2 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("02", 1, polyline02)} >Route 2 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("03", 0, polyline03)} >Route 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("04", 0, polyline04)} >Route 4 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("04", 1, polyline04)} >Route 4 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("05", 0, polyline05)} >Route 5</MenuItem>
          <MenuItem onClick={()=>this.handleClose("06", 0, polyline06)} >Route 6</MenuItem>
          <MenuItem onClick={()=>this.handleClose("08", 0, polyline08)} >Route 8</MenuItem>
          <MenuItem onClick={()=>this.handleClose("09", 0, polyline09)} >Route 9</MenuItem>
          <MenuItem onClick={()=>this.handleClose("11", 0, polyline11)} >Route 11</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13", 0, polyline13)} >Route 13 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13", 1, polyline13)} >Route 13 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13U", 0, polyline13U)} >Route 13U</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 0, polyline14)} >Route 14 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 1, polyline14)} >Route 14 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 2, polyline14)} >Route 14 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 0, polyline15)} >Route 15 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 1, polyline15)} >Route 15 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 2, polyline15)} >Route 15 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 3, polyline15)} >Route 15 | Bus 4</MenuItem>
          <MenuItem onClick={()=>this.handleClose("16", 0, polyline16)} >Route 16</MenuItem>
          <MenuItem onClick={()=>this.handleClose("17", 0, polyline17)} >Route 17</MenuItem>
          <MenuItem onClick={()=>this.handleClose("18", 0, polyline18)} >Route 18 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("18", 1, polyline18)} >Route 18 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("23", 0, polyline23)} >Route 23</MenuItem>
          <MenuItem onClick={()=>this.handleClose("31", 0, polyline31)} >Route 31</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32E", 0, polyline32E)} >Route 32E</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32W", 0, polyline32W)} >Route 32W</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 0, polyline33)} >Route 33 | Bus 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 1, polyline33)} >Route 33 | Bus 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 2, polyline33)} >Route 33 | Bus 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("34", 0, polyline34)} >Route 34</MenuItem>
          <MenuItem onClick={()=>this.handleClose("35", 0, polyline35)} >Route 35</MenuItem>
        </Drawer>

        <Map center={this.state.location} zoom={this.state.zoom} onClick={this.mapClose}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker}
          {polyline}
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
