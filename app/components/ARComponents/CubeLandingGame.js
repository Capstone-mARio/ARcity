'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  ViroARScene,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroSphere,
  ViroMaterials,
  ViroNode,
  ViroFlexView,
  ViroText,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();
    this.state = {
      collisionPoint: [],
      score: 0,
      ballphysics: {
        type: 'Dynamic',
        mass: 3,
        useGravity: true,
        restitution: 0,
        friction: 0.75,
      },
    };
    this.resetCube = this.resetCube.bind(this);
    this._onFloorCollide1 = this._onFloorCollide1.bind(this);
    this._onFloorCollide2 = this._onFloorCollide2.bind(this);
  }

  resetCube() {
    this.ball.setNativeProps({ physicsBody: null });
    this.ball.setNativeProps({ position: [0, 1, -1] });
    this.ball.setNativeProps({ materials: ['cube_color'] });

    setTimeout(() => {
      this.ball.setNativeProps({ physicsBody: this.state.ballphysics });
    }, 500);
  }

  render() {
    return (
      <ViroARScene physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: false }}>
        {/* <ViroARPlaneSelector minHeight={.5} minWidth={.5}> */}

        {/*original spawn plane*/}
        <ViroQuad
          scale={[1, 1, 1]}
          position={[0, -1, -1]}
          rotation={[-90, 0, 0]}
          physicsBody={{ type: 'Static', restitution: 0 }}
        />

        {/*first score platform*/}
        <ViroQuad
          scale={[1.5, 1.5, 1.5]}
          position={[0, -1, -6]}
          rotation={[-75, 0, 0]}
          physicsBody={{ type: 'Static', restitution: 0 }}
          materials="target_floor_1"
          viroTag="platform1"
          onCollision={this._onFloorCollide1}
        />

        {/*second score platform*/}
        <ViroQuad
          scale={[1, 1, 1]}
          position={[0, 0, -8]}
          rotation={[-45, 0, 0]}
          physicsBody={{ type: 'Static', restitution: 0 }}
          materials="target_floor_2"
          viroTag="platform2"
          onCollision={this._onFloorCollide2}
        />

        <ViroSphere
          ref={obj => {
            this.ball = obj;
          }}
          heightSegmentCount={5}
          widthSegementCount={5}
          radius={0.1}
          position={[0, 1, -1]}
          rotation={[0, 0, 0]}
          physicsBody={this.state.ballphysics}
          dragType="FixedToWorld"
          materials="cube_color"
          onDrag={() => {}}
          viroTag="gameCube"
        />

        <ViroNode position={[0, 1.5, -7.75]}>
          <ViroFlexView
            width={1}
            height={0.8}
            materials="cube_color"
            position={[1.5, 0, 0]}
            onClick={this.resetCube}
          >
            <ViroText text="Reset Cube" />
          </ViroFlexView>
          <ViroFlexView
            width={1}
            height={0.8}
            materials="cube_color"
            position={[-1.5, 0, 0]}
          >
            <ViroText text={'Score: ' + this.state.score.toString()} />
          </ViroFlexView>
        </ViroNode>
        {/* </ViroARPlaneSelector> */}
        <ViroText
          text="BACK"
          width={2}
          height={2}
          position={[0, -3, -4]}
          style={styles.helloWorldTextStyle}
          onClick={() => Actions.pop()}
        />
      </ViroARScene>
    );
  }

  _onFloorCollide1(collidedTag, collidedPoint, collidedNormal) {
    // console.log(collidedPoint)
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 100,
      });
      this.ball.setNativeProps({ materials: ['cube_hit'] });
      this.ball.setNativeProps({ physicsBody: null });
    }
    // this.setState({
    //   collisionPoint: collidedPoint
    // })
  }
  _onFloorCollide2(collidedTag, collidedPoint, collidedNormal) {
    // console.log(collidedPoint)
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 200,
      });
      this.ball.setNativeProps({ materials: ['cube_hit'] });
      this.ball.setNativeProps({ physicsBody: null });
    }
    // this.setState({
    //   collisionPoint: collidedPoint
    // })
  }
}

ViroMaterials.createMaterials({
  cube_color: {
    diffuseColor: '#0021cbE6',
  },
  cube_hit: {
    diffuseColor: '#ff6347',
  },
  target_floor_1: {
    diffuseColor: '#ff6347',
  },
  target_floor_2: {
    diffuseColor: '#008000',
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
