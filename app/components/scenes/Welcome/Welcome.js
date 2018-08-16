import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { iOSUIKit, material } from 'react-native-typography'


import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import ResponsiveButton from '../../SubComponents/ResponsiveButton';

import styles from './styles';

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Image
            style={{
              alignSelf: 'center',
              height: 300,
              width: 300,
              borderRadius: 75,
              marginBottom: 50,
            }}
            source={require('../../assets/ARcity_hd.png')}
          />
          <ResponsiveButton
            text={'Login to experience AR'}
            onPress={Actions.Login}
          />

          <ResponsiveButton
            text={'Register'}
            onPress={Actions.Register}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {}
)(Welcome);
