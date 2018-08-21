'use strict';

//React Imports
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroAmbientLight,
  ViroText,
} from 'react-viro';

//Redux Imports
import { connect } from 'react-redux';
import { setThis } from '../../redux/reducers/arCityReducer';
import { createUser } from '../../redux/reducers/authReducer';
import { fetchLocations } from '../../redux/reducers/locationReducer';

//Location And Games
import CubeLandingGame from './CubeLandingGame'
import ShootingGame from './ShootingGame'
import Suitcase from './Suitcase'
import Coin from './Coin'
import LocationBox from './LocationBox'

//Scene Strings
const CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
const SHOOTING_GAME = 'SHOOTING_GAME';

//Tracking Options
var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
}

//Style
const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

class LocationSample extends Component {
  constructor() {
    super();
    this.state = {
      currLocation: {
        x: 0,
        y: 0
      },
    }
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.getXY = this.getXY.bind(this)
    this._makeObj = this._makeObj.bind(this)
    this._displayObjs = this._displayObjs.bind(this)
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  //Functions For Firebase
  onSuccess() {
    console.log('success');
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      console.log('error');
    }
  }

  componentDidMount() { //HOPEFULLY THE RIGHT WAY
    // await this.props.fetchLocations();
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  render() {
    this.props.setThis(this);
    return this.state.currLocation.x !== 0 ?
      (
        <ViroARScene physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }}>
          <ViroAmbientLight color="#FFFFFF" />
          {this._displayObjs()}
        </ViroARScene>
      ) : null
  }

  //On Successful Location Found
  success(pos) {
    var crd = pos.coords;
    const XY = this.getXY(crd.latitude, crd.longitude)
    this.setState({
      currLocation: { x: XY.x, y: XY.y }
    })
  }
  //On A Error
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //Turns Lat & Long To XY
  getXY(lat, lon) {
    let lon_rad = (lon / 180.0 * Math.PI)
    let lat_rad = (lat / 180.0 * Math.PI)
    const sm_a = 6378137.0
    let x = sm_a * lon_rad
    let y = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))

    return { x, y }
  }
  //Make A Obj At Location
  _makeObj() {
    var objs = []
    const { locations } = this.props;
    for (let i = 0; i < locations.length; i++) {
      const targetXY = this.getXY(locations[i].latitude, locations[i].longitude)
      locations[i].x = targetXY.x;
      locations[i].y = targetXY.y;
    }
    for (let i = 0; i < locations.length; i++) {
      const realX = locations[i].x - this.state.currLocation.x;
      const realY = locations[i].y - this.state.currLocation.y;
      const id = locations[i].id
      const cost = locations[i].cost
      var obj;
      if (id === 3) {
        obj = <Suitcase pos={[realX, -10, realY]} />
      } else if (id === 4) {
        obj = <Coin pos={[realX, -10, realY]} />
      } else {
        obj = <LocationBox pos={[realX, 1, realY]} id={id} cost={cost}/>
      }
      objs.push(obj)
    }
    return objs;
  }
  //Display The Obj At Location
  _displayObjs() {
    return (
      <ViroNode>
        {this._makeObj()}
      </ViroNode>
    )
  }
}

const mapToState = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  locations: state.locationReducer.locations,
});

const mapToDispatch = (dispatch) => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
  fetchLocations: () => dispatch(fetchLocations()),
  setThis: (aThis) => { dispatch(setThis(aThis)) },
})

export default connect(mapToState, mapToDispatch)(LocationSample);
