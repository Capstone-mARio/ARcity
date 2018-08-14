import React, { Component } from 'react';

import {
  ViroARScene,
  Viro3DObject,
} from 'react-viro';

import {getXY, targetLocation} from './LocationGetter'

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

export default class LocationSample extends Component{
  constructor(){
    super();
    this.state = {
      position: [],
      currLocation: {
        x: 0,
        y: 0
      }
    }
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
  }

  async componentDidMount(){
    await navigator.geolocation.getCurrentPosition(this.success, this.error, options)
  }

  render(){
    navigator.geolocation.watchPosition(this.success, this.error, options);
    console.log('position', this.state.position);

    return this.state.currLocation.x !== 0 ?
    (
      <ViroARScene physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }}>
        <ViroBox
          type="GLTF"
          position={this.state.position}
          height={5}
          length={5}
          width={5}
        />
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
      currLocation : {x: XY.x, y: XY.y }
    })

    const realX = targetLocation.x - this.state.currLocation.x;
    const realY = targetLocation.y-this.state.currLocation.y;

    this.setState({
      position: [realX, 1, -realY]
    })

    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
  }
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

}
module.exports=LocationSample
