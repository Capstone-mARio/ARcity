import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import GameScore from './GameScore/GameScore'
import GameObjects from './GameObjects/GameObjects'
import { material } from 'react-native-typography';
import { color } from '../../styles/theme';
import styles from './SubTabStyles';

const Scores = () => (
  <GameScore />
);
const Objects = () => (
  <GameObjects />
);
const Bitcoins = () => (
  <View style={styles.container}>
    <Text style={material.display2White}>You have: 10</Text>
    <Image style={styles.bitcoin} source={require('../assets/bitcoin_icon_white.png')} />
  </View>
)

export default class SubTab extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'scores', title: 'Game Scores' },
      { key: 'objects', title: 'My Objects' },
      { key: 'bitcoins', title: 'Bitcoins' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          scores: Scores,
          objects: Objects,
          bitcoins: Bitcoins,
        })}
        renderTabBar={props =>
          <TabBar
            {...props}
            tabStyle={{ backgroundColor: color.button_color }}
            style={{ backgroundColor: '#b73c71', width: 400 }}
          />
        }
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: 300, height: 300 }}
      />
    );
  }
}
