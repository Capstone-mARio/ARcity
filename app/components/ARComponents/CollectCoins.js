//React Imports
import React, { Components } from 'react'
import {
  ViroARScene,
} from 'react-viro'

class CollectCoins extends Components {
  constructor() {
    super();
    this.state = {
      coinNum: 1,
      coinSpawn: 5000
    }
    this._addCoin = this._addCoin.bind(this);
    this._makeCoins = this._makeCoins.bind(this);
    this._displayCoins = this._displayCoins.bind(this);
  }

  render() {
    return (
      <ViroARScene>
        {this._displayCoins()}
      </ViroARScene>
    )
  }

  _addCoin() {
    setTimeout(function () {
      this.setState({
        coinNum: this.state.coinNum + 1
      })
    }, this.state.coinSpawn)
  }

  _makeCoins() {
    var coins = []
    for (let i = 0; i < this.state.coinNum; coins++) {
      var coin = <ViroBox
        scale={[1, 1, 1]}
        position={[0, 1, -1]}
        viroTag="coin"
      />
      coins.push(coin);
    }
    return coins;
  }

  _displayCoins() {
    return this.state.coinNum ? (
      <ViroNode>
        {this._makeCoins()}
      </ViroNode>
    ) : null
  }
}

export default CollectCoins;