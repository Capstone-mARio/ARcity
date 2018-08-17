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
  ViroAmbientLight
} from 'react-viro';

import { connect } from 'react-redux';
import { createUser } from '../../redux/reducers/authReducer';

//StyleSheet
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
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }
  onSuccess() {
    console.log('success')
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      console.log('error')
    }
  }

  render() {
    //Ball Position Checker

    return this.state.loaded ? (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: false }}
      >
      <ViroAmbientLight color="#FFFFFF" />
        <ViroNode position={[0, -10, -10]} onDrag={()=>{}}>
      <Viro3DObject
           source={require('../assets/suitcase/Vintage_Suitcase_LP.vrx')}
           position={[0, -10, -10]}
           scale={[0.15, 0.15, 0.15]}
           rotation={[-90, 0, 0]}
           type='VRX'
           onClick={(pos, source)=>{
             console.log(source)
            this.props.createUser(
              {
                uid: this.props.user.uid,
                username: this.props.user.username,
                coins: this.props.user.coins + 100,
                games: this.props.user.games,
                objects: this.props.user.objects
              },
              this.onSuccess,
              this.onError
            );
           }}
         />
         </ViroNode>
      </ViroARScene>
    ) : (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
      >
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

const mapStateToProps = state => ({
  user: state.authReducer.user || {games:'[]', objects:'[]', coins:0}
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestZone)
