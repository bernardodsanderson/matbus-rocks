import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { divIcon } from 'leaflet';

import { polyline00, polyline01, polyline02, polyline03, polyline04, polyline05, polyline06, polyline09, polyline11, polyline13, polyline13U, polyline14, polyline15, polyline16, polyline17, polyline18, polyline31, polyline32E, polyline32W, polyline33, polyline34 } from './routes.js';
import './index.css';

// http://165.234.255.87:8080/feed/vehicle/byRoutes/14
// http://165.234.255.87:8080/fixedroute/
// http://www.openrouteservice.org
// http://map.project-osrm.org/?z=17&center=46.874476%2C-96.769863&loc=46.873879%2C-96.768329&loc=46.872800%2C-96.773994&hl=en&alt=0
// https://github.com/Project-OSRM/osrm-backend/wiki/Server-API---v4,-old
// http://wiki.openstreetmap.org/wiki/Routing/online_routers
// https://maps.skobbler.com

class App extends React.Component {

  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.mapMove = this.mapMove.bind(this);
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
      stopCenter: 0,
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
      if (response.data.data.length < 1 || response.data.data[bus_number] === undefined) {
        _this.setState({zoom: 12, location: [46.8695, -96.7901], once: false, bus: ''});
        // console.log('not working!');
        _this.openSnackbar();
        return 0;
      } else {
        // console.log('working');
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
    this.setState({open: false, route: event, once: false, bus: bus_number, polyline: polyline, stopCenter: 0});
    this.callAPI(event, bus_number);
  }

  mapMove() {
    this.setState({open: false, stopCenter: this.state.stopCenter + 1});
  }

  openSnackbar() {
    this.setState({snackbar: true});
  }

  closeSnackbar() {
    this.setState({snackbar: false});
  }

  render() {

    const RouteButton = <FlatButton className="routes" onClick={this.handleToggle} label="Routes" />;

    const bus = <i className="material-icons">directions_bus</i>;

    const myIcon = divIcon({
      className: 'material-icons',
      iconSize: [24, 24],
      html: `<i class="material-icons floating-icon" style="color: #f44336">directions_bus</i>`,
    });

    // Marker & Polyline
    let marker = '';
    let polyline = '';
    // this.state.route && this.state.once
    if (true) {
      marker = <Marker draggable={false} position={this.state.location} icon={myIcon}><Popup><span>Route: {this.state.route}</span></Popup></Marker>;
      polyline = <Polyline color='#607d8b' positions={this.state.polyline} />;
    }

    // Route
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

    // Map
    let map = '';
    if (this.state.stopCenter > 2) {
      map = <Map onClick={this.mapMove} onMoveend={this.mapMove}>
          <TileLayer
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker}
          {polyline}
        </Map>
    } else {
      map = <Map center={this.state.location} zoom={this.state.zoom} onClick={this.mapMove} onMoveend={this.mapMove}>
          <TileLayer
            url='http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker}
          {polyline}
        </Map>
    }

    return (
      <div className="App">

        <AppBar className="appBar" title={bus} iconElementLeft={route} iconElementRight={RouteButton} />

        <Drawer open={this.state.open} className="drawer">
          <MenuItem onClick={()=>this.handleClose("0%20-%20LinkFM", 0, polyline00)} ><span className="bus">LinkFM</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("01", 0, polyline01)} ><span className="bus">Route 1</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("02", 0, polyline02)} ><span className="bus">Route 2</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("02", 1, polyline02)} ><span className="bus">Route 2</span><small>Bus 2</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("03", 0, polyline03)} ><span className="bus">Route 3</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("04", 0, polyline04)} ><span className="bus">Route 4</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("04", 1, polyline04)} ><span className="bus">Route 4</span><small>Bus 2</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("05", 0, polyline05)} ><span className="bus">Route 5</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("06", 0, polyline06)} ><span className="bus">Route 6</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("09", 0, polyline09)} ><span className="bus">Route 9</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("11", 0, polyline11)} ><span className="bus">Route 11</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("13", 0, polyline13)} ><span className="bus">Route 13</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("13", 1, polyline13)} ><span className="bus">Route 13</span><small>Bus 2</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("13U", 0, polyline13U)} ><span className="bus">Route 13U</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("14", 0, polyline14)} ><span className="bus">Route 14</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 1, polyline14)} ><span className="bus">Route 14</span><small>Bus 2</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("14", 2, polyline14)} ><span className="bus">Route 14</span><small>Bus 3</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("15", 0, polyline15)} ><span className="bus">Route 15</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 1, polyline15)} ><span className="bus">Route 15</span><small>Bus 2</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 2, polyline15)} ><span className="bus">Route 15</span><small>Bus 3</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("15", 3, polyline15)} ><span className="bus">Route 15</span><small>Bus 4</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("16", 0, polyline16)} ><span className="bus">Route 16</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("17", 0, polyline17)} ><span className="bus">Route 17</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("18", 0, polyline18)} ><span className="bus">Route 18</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("18", 1, polyline18)} ><span className="bus">Route 18</span><small>Bus 2</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("31", 0, polyline31)} ><span className="bus">Route 31</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("32E", 0, polyline32E)} ><span className="bus">Route 32E</span></MenuItem>
          <MenuItem onClick={()=>this.handleClose("32W", 0, polyline32W)} ><span className="bus">Route 32W</span></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("33", 0, polyline33)} ><span className="bus">Route 33</span><small>Bus 1</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 1, polyline33)} ><span className="bus">Route 33</span><small>Bus 2</small></MenuItem>
          <MenuItem onClick={()=>this.handleClose("33", 2, polyline33)} ><span className="bus">Route 33</span><small>Bus 3</small></MenuItem>
          <hr/>
          <MenuItem onClick={()=>this.handleClose("34", 0, polyline34)} ><span className="bus">Route 34</span></MenuItem>
        </Drawer>

        { map }

        <Snackbar
          open={this.state.snackbar}
          message='This bus is not running right now!'
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
          className="snackbar"
        />

      </div>
    );
  }
}

export default App;
