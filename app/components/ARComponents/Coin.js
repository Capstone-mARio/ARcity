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

import { connect } from 'react-redux';
import { createUser } from '../../redux/reducers/authReducer';

ViroAnimations.registerAnimations({
  rise: {
    properties: { positionX: 0, positionY: 1, positionZ: 0, opacity: 0.0 },
    easing: 'EaseOut',
    duration: 1000,
  },
  rotate: {
    properties: { rotateY: '+=45' },
    duration: 500,
  },
});

//StyleSheet
const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 120,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

class Coin extends Component {
  constructor() {
    super();
    this.state = {
      coin: true,
      coinText: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }
  onSuccess() {
    console.log('success');
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      console.log('error');
    }
  }

  render() {
    //Ball Position Checker

    return (
      <ViroNode
        position={[this.props.pos[0], this.props.pos[1], this.props.pos[2]]}
      >
        <Viro3DObject
          source={require('../assets/coin/dogecoin.vrx')}
          position={[0, -10, 0]}
          scale={[0.01, 0.01, 0.01]}
          rotation={[-90, 0, 0]}
          type="VRX"
          visible={this.state.coin}
          animation={{ name: 'rotate', run: true, loop: true }}
          onClick={() => {
            this.setState({ coin: false, coinText: true });
            setTimeout(() => {
              this.setState({ coinText: false });
            }, 1000);
            this.props.createUser(
              {
                uid: this.props.user.uid,
                username: this.props.user.username,
                coins: this.props.user.coins + 1,
                games: this.props.user.games,
                objects: this.props.user.objects,
              },
              this.onSuccess,
              this.onError
            );
          }}
        />
        <ViroText
        transformBehaviors='billboard'
          style={styles.TextStyle}
          position={[0, -10, 0]}
          scale={[1, 1, 1]}
          text="+1!"
          visible={this.state.coinText}
          animation={{ name: 'rise', run: this.state.coinText }}
        />
      </ViroNode>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coin);
