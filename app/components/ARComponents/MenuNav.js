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

//StyleSheet
var localStyles = StyleSheet.create({
  listView: {
    flex: 1,
    height: '5%',
    width: '100%',
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: '#000000aa',
  },
});


class MenuNav extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={localStyles.listView}>
        <Text style={{ color: 'white' }} onPress={() => this.props.aThis.props.arSceneNavigator.pop()}>
          Back To ArCity
        </Text>
      </View>
    )
  }
}

const mapToState = (state) => ({
  navigator: state.arCityReducer.navigator,
  aThis: state.arCityReducer.thisIs
})

export default connect(mapToState, null)(MenuNav);
