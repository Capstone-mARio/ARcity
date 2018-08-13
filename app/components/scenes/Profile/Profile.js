import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';

// import {actions as auth} from "../../index"
// const {} = auth;

import styles from './styles';

class Profile extends React.Component {
  onSwipeLeft() {
    Actions.ARHome();
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={() => this.onSwipeLeft()}
        config={config}
      >
        <View style={styles.outerContainer}>
          <View style={styles.container}>
          <Text style={styles.title}>AR City</Text>
            <Image source={require('./default.png')} />
            <Text style={styles.username}>{this.props.user.username}</Text>
            <Button
            raised
            borderRadius={4}
            title={'Enter the AR World'}
            containerViewStyle={[styles.containerView]}
            buttonStyle={[styles.button]}
            textStyle={styles.buttonText}
            onPress={() => {
              Actions.ARHome();
            }}
          />
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
