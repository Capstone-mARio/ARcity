//React Imports
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

//Redux Imports
import { connect } from 'react-redux'

//Scene Imports
import CubeLandingGame from './CubeLandingGame'
import LocationSample from './LocationSample'
import ShootingGame from './ShootingGame'

const UNSET = 'UNSET';

class MenuNav extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    console.log('Menu:', this.props)
    console.log('Scene', this.props.aThis.props)
    return (
      <View style={localStyles.listView}>
        <Text style={{ color: 'white' }} onPress={() => this.props.aThis.props.arSceneNavigator.pop()}>
          Go Back
        </Text>
      </View>
    )
  }
}

//StyleSheet
var localStyles = StyleSheet.create({
  listView: {
    flex: 1,
    height: '15%',
    width: '100%',
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa',
  },
});

const mapToState = (state) => ({
  aThis: state.arCityReducer.thisIs
})

export default connect(mapToState, null)(MenuNav);
