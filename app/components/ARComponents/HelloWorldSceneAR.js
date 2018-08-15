'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
  ViroQuad,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroNode
          visible={true}
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          onDrag={() => {}}
        >
          <Viro3DObject
            source={require('../assets/suitcase/Vintage_Suitcase_LP.vrx')}
            position={[0, -10, -10]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[-90, 0, 0]}
            type="VRX"
            onLoadStart={this._onLoadStart}
            onLoadEnd={this._onLoadEnd}
            onError={this._onError}
          />
        </ViroNode>
      </ViroARScene>
    );
  }
  _onLoadStart() {
    console.log('OBJ loading has started');
  }
  _onLoadEnd() {
    console.log('OBJ loading has finished');
  }
  _onError(event) {
    console.log('OBJ loading failed with error: ' + event.nativeEvent.error);
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
