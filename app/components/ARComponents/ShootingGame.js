import React, { Component } from 'react';

import {
  ViroARScene,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroFlexView,
  ViroText,
  ViroSphere,
  ViroPolygon,
} from 'react-viro';

import location from './LocationGetter'

export default class ShootingGame extends Component {
  constructor(){
    super();
    this.state = {
      force: [0,0,0],
      numOfLines: 1,
    }
    this._addLine = this._addLine.bind(this);
    this._displayLines = this._displayLines.bind(this);
    // this._makeGame = this._makeGame.bind(this);
    this._shoot = this._shoot.bind(this);
    this._cameraChange = this._cameraChange.bind(this)

  }

  render(){
    // console.log(location);
    return (
      <ViroARScene physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }} onClick={this._addLine} onCameraTransformUpdate={this._cameraChange}>
        {this._displayLines()}
      </ViroARScene>
    )
  }

  _shoot() { //////////////
    var lines = []
    for (let i = 0; i < this.state.numOfLines; i++) {
      const lineKey='LineKey_'+i;
      var line = <ViroSphere ref={(obj) => this.line=obj}
        position={[0, 0, 3]}
        heightSegmentCount={5}
        widthSegementCount={5}
        radius={.1}
        key={lineKey}
        visible={false}
        materials={['ball_color']}
        physicsBody={{ mass: 1, type: 'Dynamic', force: { value: this.state.force } }}
      />
      lines.push(line)
    }
    return lines;
  }

  _addLine() { //////////////////
    this.line.setNativeProps({visible: true})
    // this.line.setNativeProps({physicsBody:{ mass: 1, type: 'Dynamic',force: { value: [this.state.position[0],this.state.position[1],this.state.position[2] ] }}})
    this.setState({ numOfLines: this.state.numOfLines + 1 })
  }

  _displayLines() { /////////////////////
    return (
      <ViroNode>
        {this._shoot()}
      </ViroNode>
    )
  }

  _cameraChange(coords){
    const positionX = coords.cameraTransform.position[0];
    const positionY = coords.cameraTransform.position[1];
    const positionZ = coords.cameraTransform.position[2];

    const forwardX = coords.cameraTransform.forward[0];
    const forwardY = coords.cameraTransform.forward[1];
    const forwardZ = coords.cameraTransform.forward[2];
    this.setState({
      force: [forwardX*10, forwardY*10,forwardZ*10]
    })
    this.line.setNativeProps({
      position: [positionX, positionY, positionZ]
    })
  }

}

ViroMaterials.createMaterials({
  ball_color: {
    diffuseColor: "#FFA500"
  },
})
