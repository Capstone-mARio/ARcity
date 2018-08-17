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
    this.state = {
      coinSpawn: false,
    }
    this._spawnCoin = this._spawnCoin.bind(this)
    this._checkCoin = this._checkCoin.bind(this)
  }

  render() {
    this._spawnCoin();
    return (
      <ViroARScene>
        <ViroText
          text="Look For The Coins!"
          position={[0, 0, -2]}
          style={styles.TextStyle}
        />
        <ViroBox
          ref={obj => {coin = obj}}
          scale={[.25, .25, .25]}
          position={[Math.floor(Math.random() * 1) - 3, 0, Math.floor(Math.random() * 1) - 3]}
          viroTag="coin"
          visible={false}
        />
      </ViroARScene>
    )
  }

  _spawnCoin(){
    setTimeout(() => {
      this.setState({
        coinSpawn: true
      })
      coin.setNativeProps({visible: true});
      this._checkCoin()
    }, 5000)
  }

  _checkCoin(){
    setTimeout(() => {
      this.setState({
        coinSpawn: false
      })
      coin.setNativeProps({visible: false});
      this._spawnCoin()
    }, 10000)
  }
}
