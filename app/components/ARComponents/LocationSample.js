import React, { Component } from 'react';

import {
  ViroARScene,
  Viro3DObject,
  ViroBox,
  ViroMaterials,
  ViroNode,
} from 'react-viro';

import { getXY, targets } from './LocationGetter'
import CubeLandingGame from './CubeLandingGame'
import ShootingGame from './ShootingGame'

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

export default class LocationSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [],
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
  }

  // async componentDidMount() {
  //   await navigator.geolocation.getCurrentPosition(this.success, this.error, options)
  // }

  render() {
    navigator.geolocation.watchPosition(this.success, this.error, options);
    console.log('position', this.state.position);

    return this.state.currLocation.x !== 0 ?
      (
        <ViroARScene physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }}>
          {this._displayObjs()}
          {/* <Viro3DObject
          type="GLTF"
          source={require('./res/hoa_hakananaia/scene.gltf')}
          resources={[

          require('./res/hoa_hakananaia/textures/Texture_0_baseColor.jpeg'),
          require('./res/hoa_hakananaia/textures/Texture_0_emissive.jpeg'),
          require('./res/hoa_hakananaia/textures/Texture_0_metallicRoughness.jpeg')
          ]}
          position={this.state.position}
          scale={[1,1,1]}
        /> */}
        </ViroARScene>

      ) : null
  }
  success(pos) {
    var crd = pos.coords;
    const XY = getXY(crd.latitude, crd.longitude)
    this.setState({
      currLocation: { x: XY.x, y: XY.y }
    })

    // const realX = targets[0].x - this.state.currLocation.x;
    // const realY = targets[0].y - this.state.currLocation.y;

    // this.setState({
    //   position: [realX, 1, -realY]
    // })

    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  }
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  _jumpNextScene(id) {
    switch (id){
      case 1: this.props.sceneNavigator.jump("Cube Game", { scene: CubeLandingGame })
      break;
      case 2: this.props.sceneNavigator.jump("Shooting Game", { scene: ShootingGame })
      break;
      default:this.props.sceneNavigator.jump("Cube Game", { scene: CubeLandingGame })
    }

  }

  _makeObj() { //////////////
    var objs = []
    for (let i = 0; i < targets.length; i++) {
      const realX = targets[i].x - this.state.currLocation.x;
      const realY = targets[i].y - this.state.currLocation.y;
      const id = targets[i].id
      var obj = <ViroBox
        type="GLTF"
        position={[realX, 1, realY]}
        height={5}
        length={5}
        width={5}
        materials={id === 1 ? "cube_color" : "cube_hit"}
        onClick={() => this._jumpNextScene(id)}
      />
      objs.push(obj)
    }
    return objs;
  }

  _displayObjs() {
    return (
      <ViroNode>
        {this._makeObj()}
      </ViroNode>
    )
  }
}

ViroMaterials.createMaterials({
  cube_color: {
    diffuseColor: '#0021cbE6',
  },
  cube_hit: {
    diffuseColor: '#83FF33',
  },
});

module.exports = LocationSample
