import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';
import { material } from 'react-native-typography';
import SubTab from '../../SubComponents/SubTab'
import { color } from '../../../styles/theme';

import styles from './styles';

class Profile extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.outerContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/ARcity_name.png')}
            />
          </View>
          <View style={styles.profileContainer}>
            <Image
              style={styles.doge}
              source={require('../../assets/doge.png')}
            />
            <Text style={material.headlineWhite}>Username: {this.props.user.username}</Text>
            <View style={styles.tabContainer}>
              <SubTab style={styles.subtab} />
            </View>
          </View>
        </View>
      </View>
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
