import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setNav } from '../../redux/reducers/arCityReducer'
import { Actions } from 'react-native-router-flux';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const UNSET = 'UNSET';

class MenuNav extends Component {
  render() {
    return (
      <View style={localStyles.listView}>
        <Text style={{ color: 'white' }} onPress={ Actions.Profile }>
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
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    backgroundColor: '#000000aa',
  },
});
const mapToDispatch = (dispatch) => ({
  setNav: (navScene) => { dispatch(setNav(navScene)) }
})

export default connect(null, mapToDispatch)(MenuNav);
