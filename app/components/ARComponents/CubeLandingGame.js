'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroQuad,
  ViroSphere,
  ViroMaterials,
  ViroNode,
  ViroText,
} from 'react-viro';

const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

var ball;

const ballphysics = { type: 'Dynamic', mass: 3, useGravity: true, restitution: 0, friction: 0.75 };

const _resetCube = () => {
  ball.setNativeProps({ physicsBody: null });
  ball.setNativeProps({ position: [0, .25, -1] });
  ball.setNativeProps({ materials: ['cube_color'] })
  setTimeout(() => {
    ball.setNativeProps({ physicsBody: ballphysics });
  }, 500);
}

setInterval(async function () {const respond = await ball.getTransformAsync();
if (respond.position[1] <= -50){
  _resetCube();
}}, 3000)

export default class CubeLandingGame extends Component {
  constructor() {
    super();
    this.state = {
      platformphysics: { type: 'Static', restitution: 0 },
      score: 0,
    };
    this._onFloorCollide1 = this._onFloorCollide1.bind(this);
    this._onFloorCollide2 = this._onFloorCollide2.bind(this);
  }

  render() {
    return (
      <ViroARScene physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: false }}>
        {/*original spawn plane*/}
        <ViroQuad
          scale={[1, 1, 1]}
          position={[0, -1, -1]}
          rotation={[-90, 0, 0]}
          physicsBody={this.state.platformphysics}
        />

        {/*first score platform*/}
        <ViroQuad
          scale={[1.5, 1.5, 1.5]}
          position={[0, -1, -6]}
          rotation={[-75, 0, 0]}
          physicsBody={this.state.platformphysics}
          viroTag="platform1"
          materials="target_floor"
          onCollision={this._onFloorCollide1}
        />

        {/*second score platform*/}
        <ViroQuad
          scale={[1.5, 1.5, 1.5]}
          position={[0, 0, -8]}
          rotation={[-45, 0, 0]}
          physicsBody={this.state.platformphysics}
          viroTag=" platform2"
          materials="target_floor"
          onCollision={this._onFloorCollide2}
        />

        <ViroSphere ref={(obj) => { ball = obj }}
          heightSegmentCount={5}
          widthSegementCount={5}
          radius={.1}
          position={[0, .25, -1]}
          rotation={[0, 0, 0]}
          physicsBody={ballphysics}
          dragType="FixedToWorld"
          viroTag="gameCube"
          materials="cube_color"
          onDrag={() => { }}
        />

        <ViroNode position={[0, 1.5, -6]}>
          <ViroText text="Reset Cube" position={[1, 0, 0]} onClick={_resetCube} style={styles.TextStyle} />
          <ViroText text={'Score: ' + this.state.score.toString()} position={[-1, 0, 0]} style={styles.TextStyle} />
        </ViroNode>
      </ViroARScene>
    )
  }

  _onFloorCollide1(collidedTag, collidedPoint, collidedNormal) {
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 100,
      })
      ball.setNativeProps({ materials: ['cube_hit'] })
      ball.setNativeProps({ physicsBody: null });
    }
  }
  _onFloorCollide2(collidedTag, collidedPoint, collidedNormal) {
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 200,
      })
      ball.setNativeProps({ materials: ['cube_hit'] })
      ball.setNativeProps({ physicsBody: null });
    }
  }
}

ViroMaterials.createMaterials({
  cube_color: {
    diffuseColor: '#0021cbE6'
  },
  cube_hit: {
    diffuseColor: '#83FF33'
  },
  target_floor: {
    diffuseColor: '#ff6347'
  },
})

module.exports = CubeLandingGame;
