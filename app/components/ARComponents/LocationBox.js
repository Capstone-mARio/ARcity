'use strict';

//React Imports
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroNode,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
} from 'react-viro';

//Redux Imports
import { connect } from 'react-redux';
import { createUser } from '../../redux/reducers/authReducer';
import { setNav } from '../../redux/reducers/arCityReducer';

//Games Import
import CubeLandingGame from './CubeLandingGame'
import ShootingGame from './ShootingGame'

//Scene Strings
const CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
const SHOOTING_GAME = 'SHOOTING_GAME';

ViroAnimations.registerAnimations({
  rise: {
    properties: { positionX: 0, positionY: -5, positionZ: 0, opacity: 0.0},
    easing: 'EaseOut',
    duration: 1000,
  },
});

//StyleSheet
const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  ErrorStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  '1': {
    diffuseTexture: require('./res/landing_cube/colorful_texture.png'), //Cube Game
  },
  '2': {
    diffuseTexture: require('./res/object_sphere/ball_texture.png'), //Shooting Game
  },
});

class LocationBox extends Component {
  constructor() {
    super();
    this.state = {
      boxText: false,
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this._jumpNextScene = this._jumpNextScene.bind(this);
  }
  onSuccess() {
    console.log('success');
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      console.log('error');
    }
  }

  //Jump To Game Method
  _jumpNextScene(id, cost) {
    switch (id) {
      case 1:
        this.props.setNav(CUBE_LANDING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - cost,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.aThis.props.arSceneNavigator.jump('Cube Game', { scene: CubeLandingGame })
        break;
      case 2:
        this.props.setNav(SHOOTING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - cost,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.aThis.props.arSceneNavigator.jump('Shooting Game', { scene: ShootingGame })
        break;
      default:
        this.props.setNav(CUBE_LANDING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - cost,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.aThis.props.arSceneNavigator.jump('Cube Game', { scene: CubeLandingGame })
    }
  }

  render() {
    return (
      <ViroNode position={[this.props.pos[0], this.props.pos[1], this.props.pos[2]]}>
        <ViroText
          transformBehaviors="billboard"
          position={[0, 2, 0]}
          scale={[2, 2, 2]}
          text={this.props.id === 1 ? 'Cube Game' : 'Shooting Game'}
          style={styles.TextStyle}
        />
        <ViroBox
          position={[0, 0, 0]}
          height={3}
          length={3}
          width={3}
          visible={Math.abs(this.props.pos[2]) <= 30 ? true : true}
          materials={this.props.id.toString()}
          onClick={() => {
            if (this.props.user.coins > this.props.cost) {
              this._jumpNextScene(this.props.id, this.props.cost)
            } else {
              alert(`Need ${this.props.cost - this.props.user.coins} more coins!`)
            }
          }}
        />
        <ViroText
          transformBehaviors='billboard'
          style={styles.ErrorStyle}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
          text="Need More Coins"
          width={3}
          height={3}
          visible={this.state.boxText}
          animation={{ name: 'rise', run: this.state.boxText, loop: true}}
        />
      </ViroNode>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  navigator: state.arCityReducer.navigator,
  aThis: state.arCityReducer.thisIs
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
  setNav: (navScene) => dispatch(setNav(navScene)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationBox);
