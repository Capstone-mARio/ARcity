'use strict';

//React Imports
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroQuad,
  ViroSphere,
  ViroMaterials,
  ViroNode,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
} from 'react-viro';

import Suitcase from './Suitcase';
import Coin from './Coin';

const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

class TestZone extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this._onInitialized = this._onInitialized.bind(this);
  }
  render() {
    //Ball Position Checker

    return this.state.loaded ? (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: false }}
      >
        {/* need ambient light, otherwise object won't display */}
        <ViroAmbientLight color="#FFFFFF" />
        {/* need viroNode, to wrap object */}
        {/* <Suitcase pos={[0, 0, -10]} /> */}
        <Coin pos={[0, 0, -10]} />
        <Coin pos={[0, 0, 10]} />
        <Coin pos={[10, 0, 0]} />
        <Coin pos={[-10, 0, 0]} />
        <Suitcase pos={[-10, 0, 10]} />
        <Suitcase pos={[10, 0, -10]} />
      </ViroARScene>
    ) : (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          style={styles.TextStyle}
          position={[0, 0, -1]}
          text="Loading..."
        />
      </ViroARScene>
    );
  }

  _onInitialized(state) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        ballsRemaining: 9,
        loaded: true,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}
export default TestZone;
