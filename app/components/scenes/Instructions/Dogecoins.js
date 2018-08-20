import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { material } from 'react-native-typography';
import { color } from '../../../styles/theme';
import styles from './styles';

class Dogecoins extends Component {
  render() {
    const coins = Number(this.props.user.coins);
    return (
      <View style={styles.dogeContainer}>
        <Text style={material.display2White}>You have: {coins}</Text>
        <Image
          style={styles.dogecoin}
          source={require('../../assets/dogecoin.png')}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
});

export default connect(
  mapStateToProps,
  {}
)(Dogecoins);
