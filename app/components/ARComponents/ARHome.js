/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
console.disableYellowBox = true;

import React, { Component } from 'react';
import '../../../secrets';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {location, targetLocation} from './LocationGetter'

import {
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: process.env.viroKey,
};

// Sets scenes you want for AR
var InitialARScene = require('./HelloWorldSceneAR');
var CubeLandingGame = require('./CubeLandingGame');
var LocationSample = require('./LocationSample');
var ShootingGame = require('./ShootingGame');

var UNSET = 'UNSET';
var AR_NAVIGATOR_TYPE = 'AR';
var CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
var SHOOTING_GAME = 'SHOOTING_GAME';
var LOCATION_SAMPLE = 'LOCATION_SAMPLE';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR scenes. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ARHome extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == CUBE_LANDING_GAME) {
      return this._getCubeGameNavigator();
    }
      else if (this.state.navigatorType === SHOOTING_GAME) {
        return this._getShootingGameNavigator();
      }
      else if (this.state.navigatorType === LOCATION_SAMPLE) {
        return this._getLocationSampleNavigator();
      }
  }


  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>
            Choose your desired experience:
          </Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>AR</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(CUBE_LANDING_GAME)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>CUBE GAME</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(SHOOTING_GAME)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>SHOOTING GAME</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(LOCATION_SAMPLE)}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>LOCATION SAMPLE</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        worldAlignment="GravityAndHeading"
      />
    );
  }

  _getCubeGameNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: CubeLandingGame }}
      />
    );
  }
  _getShootingGameNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: ShootingGame }}
      />
    );
  }
  _getLocationSampleNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: LocationSample }}
      />
    );
  }



  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET,
    });
  }
}

var localStyles = StyleSheet.create({
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
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
});

module.exports = ARHome;
