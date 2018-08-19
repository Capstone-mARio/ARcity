'use strict';

//React Imports
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroQuad,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroText,
  ViroSphere,
  ViroCamera
} from 'react-viro';

//Redux Imports
import { connect } from 'react-redux';
import { createUser } from '../../redux/reducers/authReducer';

//StyleSheets
const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
const blockCount = 5;

ViroMaterials.createMaterials({
  ball_color: {
    diffuseColor: "#FFA500"
  },
  block_color: {
    diffuseColor: '#FF60E4'
  }
})

//Calculates The Position Of The Blocks Randomly
const randomPos = [];
for (let i = 0; i < blockCount; i++) {
  randomPos.push([Math.random() * (7 - 1 + 1) - 4, Math.random() * (20 - 5 + 5), (Math.random() * (7 - 1 + 1) - 4)])
}


class ShootingGame extends Component {
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
      cameraPos: [0, 0, 0]
    }
    this._addLine = this._addLine.bind(this);
    this._displayLines = this._displayLines.bind(this);
    this._shoot = this._shoot.bind(this);
    this._cameraChange = this._cameraChange.bind(this);
    this._displayBlocks = this._displayBlocks.bind(this);
    this._makeBlocks = this._makeBlocks.bind(this);
    this._gameOver = this._gameOver.bind(this);
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isReady: true })
    }, 3000);
  }

  render() {
    return (
      <ViroARScene ref={(obj) => this.scene = obj} physicsWorld={{ gravity: [0, 0, 0], drawBounds: false }} onClick={this._addLine} onCameraTransformUpdate={this._cameraChange}>
        <ViroCamera position={[0, 0, 0]} active={true} />
        {/*Reset Platform*/}
        <ViroQuad
          scale={[8, 8, 8]}
          position={[0, -3, 0]}
          rotation={[-90, 0, 0]}
          physicsBody={{ type: 'Static', restitution: 0 }}
          viroTag="platform"
          opacity={0}
        />
        {/*Game Starter*/}
        {this.state.isReady ?
          [this._displayLines(),
          this._displayBlocks()] : null}
        {/*Score*/}
        <ViroText
          text={'Score: ' + this.state.score.toString()}
          position={[0, 0, -3]}
          style={styles.TextStyle}
          visible={this.state.isReady}
        />
        {/*Get Ready*/}
        <ViroText ref={(obj) => this.ready = obj}
          text={'Get Ready!'}
          position={[0, 0, -3]}
          style={styles.TextStyle}
          visible={!this.state.isReady}
        />
        {/*Game Over*/}
        {this.state.blocksRemaining <= 0 ?
          [<ViroText
            text={'GAME OVER'}
            position={[0, 1, -3]}
            style={styles.TextStyle}
          />,
          this._gameOver()] : null}
      </ViroARScene>
    )
  }
  //GameOver Method
  _gameOver() {
    var executed = false;
    if (!executed) {
      executed = true;
      const gameScores = JSON.parse(this.props.user.games);
      const newGame = JSON.stringify([...gameScores, { game: 'Shoot It', score: this.state.score }])
      this.text.setNativeProps({ text: 'Game Over' })
      this.props.createUser(
        {
          uid: this.props.user.uid,
          username: this.props.user.username,
          coins: this.props.user.coins + this.state.score,
          games: newGame,
          objects: this.props.user.objects,
        },
        this.onSuccess,
        this.onError
      );
    }
  }
  //Shooting Method
  _shoot() {
    var balls = []
    for (let i = 0; i < this.state.numOfBalls; i++) {
      var ball = <ViroSphere ref={(obj) => this.ball = obj}
        position={[0, 0, 3]}
        heightSegmentCount={5}
        widthSegementCount={5}
        radius={.1}
        key={i}
        viroTag="ball"
        visible={false}
        materials={['ball_color']}
        physicsBody={{ mass: 1, type: 'Dynamic', force: { value: this.state.force }, useGravity: false }}
      />
      balls.push(ball)
    }
    return balls;
  }
  //Part Of Shooting Method
  _addLine() {
    if (this.ball !== undefined) {
      this.ball.setNativeProps({ visible: true })
      this.setState({ numOfBalls: this.state.numOfBalls + 1 })
    }
  }
  //Part Of Shooting Method
  _displayLines() { /////////////////////
    return this.state.isReady ? (
      <ViroNode>
        {this._shoot()}
      </ViroNode>
    ) : null
  }
  //Camera For Aim Redecoration
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
  //Makes Targets
  _makeBlocks() { //////////////
    var blocks = []
    this.block = [];
    for (let i = 0; i < this.state.numOfBlocks; i++) {
      const blockTag = 'blocktag' + i;
      var block = <ViroBox ref={(obj) => this.block[i] = obj}
        visible={true}
        height={.5}
        length={.5}
        width={.5}
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
  //Part Of Making Targets
  _displayBlocks() { /////////////////////
    return (
      <ViroNode>
        {this._makeBlocks()}
      </ViroNode>
    )
  }
  //Part Of Block Collision
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
)(ShootingGame);
