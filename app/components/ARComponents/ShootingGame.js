import React, { Component } from 'react';

import {
  ViroARScene,
  ViroQuad,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroText,
  ViroSphere,
  Viro3DObject,
  ViroCamera,
  ViroAmbientLight
} from 'react-viro';

import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
const blockCount = 25;

const randomPos = [];
for (let i = 0; i < blockCount; i++) {
  randomPos.push([Math.random() * (7 - 1 + 1) - 4, Math.random() * (20 - 5 + 5), (Math.random() * (7 - 1 + 1) - 4)])
}

export default class ShootingGame extends Component {
  constructor() {
    super();
    this.state = {
      force: [0, 0, 0],
      numOfBalls: 1,
      numOfBlocks: blockCount,
      isHit: [false, false],
      score: 0,
      blocksRemaining: blockCount,
      isReady: false,
      cameraPos: [0,0,0]
    }
    this._addLine = this._addLine.bind(this);
    this._displayLines = this._displayLines.bind(this);
    this._shoot = this._shoot.bind(this);
    this._cameraChange = this._cameraChange.bind(this);
    this._displayBlocks = this._displayBlocks.bind(this);
    this._makeBlocks = this._makeBlocks.bind(this);
  }
  componentDidMount() {
    this.props.sceneNavigator.resetARSession(true,false)
    setTimeout(() => {
      this.setState({ isReady: true })
    }, 5000);
  }
  render() {
    return (
      <ViroARScene ref={(obj) => this.scene = obj} physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }} onClick={this._addLine} onCameraTransformUpdate={this._cameraChange}>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroCamera position={[0,0,0]} active={true} />
        <ViroQuad
          scale={[8, 8, 8]}
          position={[0, -3, 0]}
          rotation={[-90, 0, 0]}
          physicsBody={{ type: 'Static', restitution: 0 }}
          viroTag="platform"
          opacity={0}
        />
        {this.state.isReady ?
          [this._displayLines(),
          this._displayBlocks()] : null}

        <ViroText
          text={'Score: ' + this.state.score.toString()}
          position={[0, 0, -3]}
          style={styles.TextStyle}
          visible={this.state.isReady}
        />
        <ViroText ref ={ (obj) => this.ready = obj}
          text={'Get Ready!'}
          position={[0, 0, -3]}
          style={styles.TextStyle}
          visible={!this.state.isReady}
        />
        {this.state.blocksRemaining <= 0 ?
          <ViroText
            text={'GAME OVER'}
            position={[0, 1, -3]}
            style={styles.TextStyle}
          /> : null}
      </ViroARScene>
    )
  }

  _shoot() { //////////////
    var balls = []
    for (let i = 0; i < this.state.numOfBalls; i++) {
      var ball = <Viro3DObject ref={(obj) => this.ball = obj}
        source={require('./res/object_sphere/object_sphere.vrx')}
        position={[0, 0, 3]}
        heightSegmentCount={5}
        widthSegementCount={5}
        scale={[.1,.1,.1]}
        key={i}
        viroTag="ball"
        visible={false}
        materials={['ball_color']}
        physicsBody={{ mass: 1, type: 'Dynamic', force: { value: this.state.force }, useGravity: false }}
        type={"VRX"}
      />
      balls.push(ball)
    }
    return balls;
  }

  _addLine() {
    if (this.ball !== undefined) {
      this.ball.setNativeProps({ visible: true })
      this.setState({ numOfBalls: this.state.numOfBalls + 1 })
    }
  }

  _displayLines() { /////////////////////
    return this.state.isReady ? (
      <ViroNode>
        {this._shoot()}
      </ViroNode>
    ) : null
  }

  _cameraChange(coords) {
    const positionX = coords.cameraTransform.position[0];
    const positionY = coords.cameraTransform.position[1];
    const positionZ = coords.cameraTransform.position[2];

    const forwardX = coords.cameraTransform.forward[0];
    const forwardY = coords.cameraTransform.forward[1];
    const forwardZ = coords.cameraTransform.forward[2];

    this.setState({
      force: [forwardX * 10, forwardY * 10, forwardZ * 10]
    })
    if (this.ball) {
      this.ball.setNativeProps({
        position: [positionX, positionY, positionZ]
      })
    }
  }
  _makeBlocks() { //////////////
    var blocks = []
    this.block = [];
    for (let i = 0; i < this.state.numOfBlocks; i++) {
      const blockTag = 'blocktag' + i;
      var block = <Viro3DObject ref={(obj) => this.block[i] = obj}
        source={require('./res/object_cube/object_cube.vrx')}
        type={"VRX"}
        visible={true}
        scale={[.5,.5,.5]}
        key={blockTag}
        position={randomPos[i]}
        materials={['block_color']}
        viroTag={blockTag}
        onCollision={this._onBlockCollide.bind(this, i)}
        physicsBody={{ mass: 1, type: 'Dynamic', torque: [0, .02, 0], velocity: [0, -1, 0] }}
      />
      blocks.push(block)
    }
    return blocks;
  }

  _displayBlocks() { /////////////////////
    return (
      <ViroNode>
        {this._makeBlocks()}
      </ViroNode>
    )
  }

  _onBlockCollide(idx, collidedTag, collidedPoint, collidedNormal) {
    if (collidedTag === 'ball') {
      this.setState({ score: this.state.score + 100 })
    }
    this.setState({ blocksRemaining: this.state.blocksRemaining - 1 })
    this.block[idx].setNativeProps({
      visible: false
    })
  }

}

ViroMaterials.createMaterials({
  ball_color: {
    diffuseColor: "#FFA500"
  },
  block_color: {
    diffuseColor: '#FF60E4'
  }
})
