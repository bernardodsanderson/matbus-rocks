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
      zoom: 12,
      location: [46.8695, -96.7901],
      open: false,
      value: 1,
      once: true,
      snackbar: false
    }
  }

  callAPI(route_number) {
    let _this = this;
    axios.get('http://165.234.255.87:8080/feed/vehicle/byRoutes/'+route_number, {
      'Content-Type': 'application/json',
    })
    .then(function (response) {
      // console.log(response.data.data[0].latitude);
      if (response.data.data.length === 0) {
        console.log('not working!');
        _this.openSnackbar();
      }
      _this.setState({zoom: 16, location: [response.data.data[0].latitude, response.data.data[0].longitude], once: false});
      _this.callAPI(route_number);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose(event) { 
    this.setState({open: false, route: event, once: true});
    this.callAPI(event);
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

    return (
      <div className="App">

        <AppBar title={bus} iconElementLeft='' iconElementRight={ButtonTest} />

        <Drawer open={this.state.open}>
          <MenuItem onClick={()=>this.handleClose("0%20-%20LinkFM")} >LinkFM</MenuItem>
          <MenuItem onClick={()=>this.handleClose("01")} >Route 1</MenuItem>
          <MenuItem onClick={()=>this.handleClose("02")} >Route 2</MenuItem>
          <MenuItem onClick={()=>this.handleClose("03")} >Route 3</MenuItem>
          <MenuItem onClick={()=>this.handleClose("04")} >Route 4</MenuItem>
          <MenuItem onClick={()=>this.handleClose("05")} >Route 5</MenuItem>
          <MenuItem onClick={()=>this.handleClose("06")} >Route 6</MenuItem>
          <MenuItem onClick={()=>this.handleClose("07")} >Route 7</MenuItem>
          <MenuItem onClick={()=>this.handleClose("08")} >Route 8</MenuItem>
          <MenuItem onClick={()=>this.handleClose("09")} >Route 9</MenuItem>
          <MenuItem onClick={()=>this.handleClose("10")} >Route 10</MenuItem>
          <MenuItem onClick={()=>this.handleClose("11")} >Route 11</MenuItem>
          <MenuItem onClick={()=>this.handleClose("12")} >Route 12</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13")} >Route 13</MenuItem>
          <MenuItem onClick={()=>this.handleClose("13U")} >Route 13U</MenuItem>
          <MenuItem onClick={()=>this.handleClose("14")} >Route 14</MenuItem>
          <MenuItem onClick={()=>this.handleClose("15")} >Route 15</MenuItem>
          <MenuItem onClick={()=>this.handleClose("16")} >Route 16</MenuItem>
          <MenuItem onClick={()=>this.handleClose("17")} >Route 17</MenuItem>
          <MenuItem onClick={()=>this.handleClose("18")} >Route 18</MenuItem>
          <MenuItem onClick={()=>this.handleClose("23")} >Route 23</MenuItem>
          <MenuItem onClick={()=>this.handleClose("31")} >Route 31</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32E")} >Route 32E</MenuItem>
          <MenuItem onClick={()=>this.handleClose("32W")} >Route 32W</MenuItem>
          <MenuItem onClick={()=>this.handleClose("33")} >Route 33</MenuItem>
          <MenuItem onClick={()=>this.handleClose("34")} >Route 34</MenuItem>
          <MenuItem onClick={()=>this.handleClose("35")} >Route 35</MenuItem>
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
        />

      </div>
    );
  }
}

export default App;
