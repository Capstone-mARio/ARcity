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

class Suitcase extends Component {
  constructor() {
    super();
    this.state = {
      briefcase: true,
      briefcaseText: false,
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
          source={require('../assets/suitcase/Vintage_Suitcase_LP.vrx')}
          position={[0, -10, 0]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[-90, 0, 0]}
          type="VRX"
          visible={this.state.briefcase}
          onClick={() => {
            this.setState({ briefcase: false, briefcaseText: true });
            setTimeout(() => {
              this.setState({ briefcaseText: false });
            }, 1000);
            this.props.createUser(
              {
                uid: this.props.user.uid,
                username: this.props.user.username,
                coins: this.props.user.coins + 100,
                games: this.props.user.games,
                objects: this.props.user.objects,
              },
              this.onSuccess,
              this.onError
            );
          }}
        />
        {this.state.briefcaseText ? (
          <ViroText
            style={styles.TextStyle}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            text="+100!"
            animation={{ name: 'rise', run: true }}
          />
        ) : null}
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
)(Suitcase);
