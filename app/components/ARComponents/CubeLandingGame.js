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
  ViroCamera,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

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

//Ball Related Code
var ball;
const ballphysics = {
  type: 'Dynamic',
  mass: 10000,
  useGravity: true,
  restitution: 0,
  friction: 0.75,
};
//Ball Reset Method
const _resetCube = thisContext => {
  let ballsRemaining = thisContext.state.ballsRemaining;
  if (ballsRemaining) {
    thisContext.setState({
      ballsRemaining: ballsRemaining - 1,
    });
    ball.setNativeProps({ physicsBody: null, scale:[.1,.1,.1] });
    ball.setNativeProps({ position: [0, 0.25, -1] });
    ball.setNativeProps({ materials: ['cube_color'] });
    setTimeout(() => {
      ball.setNativeProps({ physicsBody: ballphysics });
    }, 500);
  }
};


class CubeLandingGame extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      platformphysics: { type: 'Static', restitution: 0 },
      score: 0,
      ballsRemaining: 10,
    };
    this._onFloorCollide1 = this._onFloorCollide1.bind(this);
    this._onFloorCollide2 = this._onFloorCollide2.bind(this);
    this._onInitialized = this._onInitialized.bind(this);
  }


  render() {
    //Ball Position Checker
    setInterval(async () => {
      const respond = await ball.getTransformAsync();
      if (respond.position[1] <= -10) {
        _resetCube(this);
      }
    }, 500);

    return this.state.loaded ? (
      <ViroARScene onTrackingUpdated={this._onInitialized} physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: true }}>
        <ViroAmbientLight color="#FFFFFF" />
        {/*original spawn plane*/}
        <ViroCamera  position={[0, 0, 1]} active={true} />
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

        <Viro3DObject
          ref={obj => {
            ball = obj;
          }}
          source={require('./res/landing_cube/object_sphere.vrx')}
          type={"VRX"}
          scale={[.1,.1,.1]}
          position={[0, 0.25, -1]}
          rotation={[0, 0, 0]}
          physicsBody={ballphysics}
          dragType="FixedDistance"
          viroTag="gameCube"
          materials="cube_color"
          onDrag={() => {}}
        />

        <ViroNode position={[0, 1.5, -6]}>
          <ViroText
            text={`Reset ${this.state.ballsRemaining} left`}
            position={[1, 0, 0]}
            onClick={() => {
              _resetCube(this);
            }}
            style={styles.TextStyle}
          />
          <ViroText
            text={'Score: ' + this.state.score.toString()}
            position={[-1, 0, 0]}
            style={styles.TextStyle}
          />
        </ViroNode>
      </ViroARScene>
    ) : (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        physicsWorld={{ gravity: [0, -9.81, 0], drawBounds: false }}
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

  //Scoring Collision
  _onFloorCollide1 = (collidedTag, collidedPoint) => {
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 100,
      });
      ball.setNativeProps({ materials: ['cube_hit'] });
      ball.setNativeProps({ physicsBody: null });

      setTimeout(() => {
        _resetCube(this);
      }, 1000);
    }
  };
  _onFloorCollide2 = (collidedTag, collidedPoint) => {
    if (collidedTag === 'gameCube') {
      this.setState({
        score: this.state.score + 200,
      });
      ball.setNativeProps({ materials: ['cube_hit'] });
      ball.setNativeProps({ physicsBody: null });

      setTimeout(() => {
        _resetCube(this);
      }, 1000);
    }
  };
}

ViroMaterials.createMaterials({
  cube_color: {
    diffuseColor: '#0021cbE6',
  },
  cube_hit: {
    diffuseColor: '#83FF33',
  },
  target_floor: {
    diffuseColor: '#ff6347',
  },
});

export default CubeLandingGame;
