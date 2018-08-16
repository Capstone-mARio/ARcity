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
import { setNav } from '../../redux/reducers/arCityReducer';

//Location Scene String
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';

//StyleSheet
var localStyles = StyleSheet.create({
  listView: {
    flex: 1,
    height: 32,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: '#66d973',
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
      {this.props.navigator !== LOCATION_SAMPLE ? 
        <Text style={{ padding: 10, color: 'white' }} onPress={() => {
          this.props.setNav(LOCATION_SAMPLE)
          this.props.aThis.props.arSceneNavigator.pop()
        }}>
          Back To ArCity
        </Text> :
        <Text style={{ color: 'white' }} onPress={ Actions.Profile }>
          Back To Profile
        </Text>
      }
      </View>
    )
  }
}

const mapToState = (state) => ({
  navigator: state.arCityReducer.navigator,
  aThis: state.arCityReducer.thisIs
})

const mapToDispatch = (dispatch) => ({
  setNav: (navScene) => dispatch(setNav(navScene)),
})

export default connect(mapToState, mapToDispatch)(MenuNav);
