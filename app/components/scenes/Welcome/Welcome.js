import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// import {actions as auth} from "../../index"
// const {} = auth;

import styles from './styles';

class Welcome extends React.Component {
  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Button
            raised
            borderRadius={4}
            title={'Login to experience AR'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={Actions.Login}
          />

          <Button
            raised
            borderRadius={4}
            title={'Register'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
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