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
import { setThis, setNav } from '../../redux/reducers/arCityReducer';
import { createUser } from '../../redux/reducers/authReducer';

//Location And Games
import { getXY, targets } from './LocationGetter'
import CubeLandingGame from './CubeLandingGame'
import ShootingGame from './ShootingGame'
import Suitcase from './Suitcase'
import Coin from './Coin'

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

ViroMaterials.createMaterials({
  starbucks: {
    diffuseColor: '#0021cbE6', //blue
  },
  killarney: {
    diffuseColor: '#83FF33', //green
  },
});


class LocationSample extends Component {
  constructor() {
    super();
    this.state = {
      // position: [],
      currLocation: {
        x: 0,
        y: 0
      },
    }
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this._jumpNextScene = this._jumpNextScene.bind(this)
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
    navigator.geolocation.watchPosition(this.success, this.error, options);
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
    const XY = getXY(crd.latitude, crd.longitude)
    this.setState({
      currLocation: { x: XY.x, y: XY.y }
    })
  }
  //On A Error
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  //Jump To Game Method
  _jumpNextScene(id) {
    switch (id) {
      case 1:
        this.props.setNav(CUBE_LANDING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - 100,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.arSceneNavigator.jump('Cube Game', { scene: CubeLandingGame })
        break;
      case 2:
        this.props.setNav(SHOOTING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - 500,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.arSceneNavigator.jump('Shooting Game', { scene: ShootingGame })
        break;
      default:
        this.props.setNav(CUBE_LANDING_GAME)
        this.props.createUser(
          {
            uid: this.props.user.uid,
            username: this.props.user.username,
            coins: this.props.user.coins - 100,
            games: this.props.user.games,
            objects: this.props.user.objects,
          },
          this.onSuccess,
          this.onError
        );
        this.props.arSceneNavigator.jump('Cube Game', { scene: CubeLandingGame })
    }
  }
  //Make A Obj At Location
  _makeObj() {
    var objs = []
    for (let i = 0; i < targets.length; i++) {
      const realX = targets[i].x - this.state.currLocation.x;
      const realY = targets[i].y - this.state.currLocation.y;
      const id = targets[i].id
      var obj;
      if (id === 3) {
        obj = <Suitcase pos={[realX, -10, realY]} />
      } else if (id === 4) {
        obj = <Coin pos={[realX, -10, realY]} />
      } else {
        obj = <ViroNode position={[realX, 1, realY]}>
          <ViroBox
            position={[0,0,0]}
            height={5}
            length={5}
            width={5}
            visible={Math.abs(realY) <= 30 ? true : true}
            materials={id === 1 ? "starbucks" : "killarney"}
            onClick={() => this._jumpNextScene(id)}
          />
          <ViroText
            position={[0,.5,0]}
            text={id === 1 ? "Ball Throw" : "Shoot Cubes"}
            style={styles.TextStyle}
          />
        </ViroNode>
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
});

const mapToDispatch = (dispatch) => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
  setNav: (navScene) => { dispatch(setNav(navScene)) },
  setThis: (aThis) => { dispatch(setThis(aThis)) },
})

export default connect(mapToState, mapToDispatch)(LocationSample);
