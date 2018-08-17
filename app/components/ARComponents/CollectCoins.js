//React Imports
import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroBox,
  ViroText,
} from 'react-viro'

const styles = StyleSheet.create({
  TextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

var coin;

export default class CollectCoins extends Component {
  constructor() {
    super();
    this.state = {}
    this._spawnCoin = this._spawnCoin.bind(this)
    this._checkCoin = this._checkCoin.bind(this)
    this._randomPos = this._randomPos.bind(this)
  }

  render() {
    this._spawnCoin();
    return (
      <ViroARScene>
        <ViroText
          text="COINS!"
          position={[0, 0, -2]}
          style={styles.TextStyle}
        />
        <ViroBox
          ref={obj => { coin = obj }}
          scale={[.25, .25, .25]}
          position={this._randomPos()}
          viroTag="coin"
          visible={false}
        />
      </ViroARScene>
    )
  }

  _randomPos () {
    return [Math.floor(Math.random() * 1) - 3, 0, Math.floor(Math.random() * 1) - 3];
  }

  _spawnCoin() {
    setTimeout(() => {
      coin.setNativeProps({ visible: true });
      this._checkCoin()
    }, 5000)
  }

  _checkCoin() {
    setTimeout(() => {
      coin.setNativeProps({ visible: false });
      coin.setNativeProps({ position: this._randomPos() })
      this._spawnCoin()
    }, 10000)
  }
}
