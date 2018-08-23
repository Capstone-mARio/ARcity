'use strict';

//React Imports
import React, { Component } from 'react';
import { ViroARScene, ViroNode, ViroAmbientLight } from 'react-viro';

//Redux Imports
import { connect } from 'react-redux';
import { setThis } from '../../redux/reducers/arCityReducer'; //Send The This Context Here To Store For Other AR Scenes

//Location Box And Games
import Suitcase from './Suitcase';
import Coin from './Coin';
import LocationBox from './LocationBox';

//Tracking Options
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

class LocationSample extends Component {
  constructor() {
    super();
    this.state = {
      currLocation: {
        x: 0,
        y: 0,
      },
    };
    this.getXY = this.getXY.bind(this);
    this._makeObj = this._makeObj.bind(this);
    this._displayObjs = this._displayObjs.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  //Success And Error Functions For Firebase
  onSuccess() {
    console.log('success');
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      console.log('error');
    }
  }

  componentDidMount() {
    this.setLocation();
  }

  render() {
    this.props.setThis(this);
    return this.state.currLocation.x !== 0 ? (
      <ViroARScene physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }}>
        <ViroAmbientLight color="#FFFFFF" />
        {this._displayObjs()}
      </ViroARScene>
    ) : null;
  }

  //On Successful Location Found
  setLocation() {
    const { currentLat, currentLong } = this.props;
    const XY = this.getXY(currentLat, currentLong);
    this.setState({
      currLocation: { x: XY.x, y: XY.y },
    });
  }
  // //On A Error
  // error(err) {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // }
  //Turns Lat & Long To XY
  getXY(lat, lon) {
    let lon_rad = (lon / 180.0) * Math.PI;
    let lat_rad = (lat / 180.0) * Math.PI;
    const sm_a = 6378137.0; //Radius Of The Earth
    let x = sm_a * lon_rad;
    let y = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));

    return { x, y };
  }
  //Makes A Obj At Location
  _makeObj() {
    var objs = [];
    const { locations } = this.props;
    for (let i = 0; i < locations.length; i++) {
      const targetXY = this.getXY(
        locations[i].latitude,
        locations[i].longitude
      );
      locations[i].x = targetXY.x;
      locations[i].y = targetXY.y;
    }
    for (let i = 0; i < locations.length; i++) {
      const realX = locations[i].x - this.state.currLocation.x;
      const realY = locations[i].y - this.state.currLocation.y;
      const id = locations[i].id;
      const cost = locations[i].cost;
      var obj;
      obj = <LocationBox pos={[realX, 1, realY]} id={id} cost={cost} />;
      objs.push(obj);
    }
    for (let j = 0; j <= 10; j++){
      obj = <Suitcase pos={[(Math.random() * 200) - 100, -10, ((Math.random() * 200) - 100)]} />;
      objs.push(obj);
      obj = <Coin pos={[(Math.random() * 200) - 100, -10, ((Math.random() * 200) - 100)]} />;
      objs.push(obj);
    }
    return objs;
  }
  //Display The Obj At Location
  _displayObjs() {
    return <ViroNode>{this._makeObj()}</ViroNode>;
  }
}

const mapToState = state => ({
  locations: state.locationReducer.locations,
  currentLat: state.locationReducer.currentLat,
  currentLong: state.locationReducer.currentLong,
});

const mapToDispatch = dispatch => ({
  setThis: aThis => {
    dispatch(setThis(aThis));
  },
});

export default connect(
  mapToState,
  mapToDispatch
)(LocationSample);
