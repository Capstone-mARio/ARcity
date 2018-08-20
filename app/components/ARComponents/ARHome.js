/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
console.disableYellowBox = true;

//React Imports
import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

//Redux Imports
import { connect } from 'react-redux';
import { setNav } from '../../redux/reducers/arCityReducer';

//Secrets
import '../../../secrets';

//API key below
var sharedProps = { apiKey: process.env.viroKey };

//Scenes for AR
import LocationSample from './LocationSample';
import CubeLandingGame from './CubeLandingGame';
import ShootingGame from './ShootingGame';
import MenuNav from './MenuNav';

import TestZone from './TestZone';

//Scene Strings
const CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';
const SHOOTING_GAME = 'SHOOTING_GAME';

//StyleSheet
const localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: 250,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  listView: {
    flex: 1,
    height: '15%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa',
  },
});

class ARHome extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps, //API KEY
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
  }

  // ARNavigator()
  render() {
    return this._getLocationSampleNavigator();

    // if (this.props.navigator == CUBE_LANDING_GAME) {
    //   return this._getCubeGameNavigator();
    // } else if (this.props.navigator === SHOOTING_GAME) {
    //   return this._getShootingGameNavigator();
    // } else if (this.props.navigator === LOCATION_SAMPLE) {
    //   return this._getLocationSampleNavigator();
    // } else {
    //   return this._getExperienceSelector();
    // }
  }

  // Presents the user with a choice of an AR games.
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => this.props.setNav(CUBE_LANDING_GAME)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>CUBE GAME</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => this.props.setNav(SHOOTING_GAME)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>SHOOTING GAME</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => this.props.setNav(LOCATION_SAMPLE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>LOCATION SAMPLE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getCubeGameNavigator() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: CubeLandingGame }}
          // worldAlignment="GravityAndHeading"
        />
        <MenuNav />
      </View>
    );
  }
  _getShootingGameNavigator() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: ShootingGame }}
          worldAlignment="Camera"
        />
        <MenuNav />
      </View>
    );
  }
  _getLocationSampleNavigator() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: LocationSample }}
          // initialScene={{ scene: CubeLandingGame }}
          worldAlignment="GravityAndHeading"
        />
        <MenuNav />
      </View>
    );
  }
}

//Redux Methods
const mapToState = state => ({
  navigator: state.arCityReducer.navigator,
});
const mapToDispatch = dispatch => ({
  setNav: navScene => dispatch(setNav(navScene)),
});

export default connect(
  mapToState,
  mapToDispatch
)(ARHome);
