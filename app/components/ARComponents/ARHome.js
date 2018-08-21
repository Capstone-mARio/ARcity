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
import { View } from 'react-native';

//Secrets
import '../../../secrets';

//API key below
var sharedProps = { apiKey: process.env.viroKey };

//Scenes for AR
import LocationSample from './LocationSample';
import MenuNav from './MenuNav';

import TestZone from './TestZone'; //Test Zoning For New AR Scenes

class ARHome extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps, //API KEY
    };
    this._getLocationSampleNavigator = this._getLocationSampleNavigator.bind(this);
  }

  // ARNavigator()
  render() {
    return this._getLocationSampleNavigator();
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getLocationSampleNavigator() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: LocationSample }}
          // initialScene={{ scene: TestZone }} Uncomment For Testing Zone
          worldAlignment="GravityAndHeading"
        />
        <MenuNav />
      </View>
    );
  }
}

//Redux Methods
export default ARHome;
