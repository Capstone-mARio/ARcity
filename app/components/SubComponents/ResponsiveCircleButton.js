import React, { Component } from 'react';
import {
  StyleSheet,
  PropTypes,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { color, windowWidth, normalize } from '../../styles/theme';
import { iOSUIKit, material } from 'react-native-typography'
import { Actions } from 'react-native-router-flux';

const main = color.button_color;
const pinkUnderlay = '#FFB6C1';  // lighter shade of pink

export default class ResponsiveCircleButton extends Component {
  constructor(props) {
    super();
    this.state = { pressStatus: false };
  }
  _onHideUnderlay(){
    this.setState({ pressStatus: false });
  }
  _onShowUnderlay(){
    this.setState({ pressStatus: true });
  }
  render(){
    return (
        <TouchableHighlight
          activeOpacity={0.4}
          style={ this.state.pressStatus ? styles.buttonPress : styles.button }
          underlayColor={pinkUnderlay}
          onHideUnderlay={this._onHideUnderlay.bind(this)}
          onShowUnderlay={this._onShowUnderlay.bind(this)}
          onPress={() => this.props.onPress()}
        >
          <Text style={ this.state.pressStatus ? material.title : material.titleWhite }>{this.props.text}</Text>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: normalize(55),
    backgroundColor: main,
    borderRadius: 85,
    margin: 20,
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  buttonPress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: normalize(55),
    borderRadius: 85,
    margin: 10,
  },
});
