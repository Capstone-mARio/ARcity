import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';
import { iOSUIKit, material } from 'react-native-typography';
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import { color } from '../../../styles/theme';

import styles from './styles';

class Profile extends React.Component {
  onSwipeLeft() {
    Actions.ARHome();
  }
  onSwipeRight() {
    Actions.GeoView();
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
        onSwipeRight={() => this.onSwipeRight()}
        config={config}
      >
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Image
                style={{
                alignSelf: 'center',
                height: 80,
                width: 300,
                margin: 10,
              }}
                source={require('../../assets/ARcity_name.png')}
              />
            </View>
            <View style={styles.profileContainer}>
              <Image
                style={{
                alignSelf: 'center',
                height: 150,
                width: 150,
                borderRadius: 75,
                margin: 3,
              }}
                source={require('../../assets/doge.png')}
              />
              <Text style={material.headlineWhite}>Username: {this.props.user.username}</Text>
              <Text style={material.headlineWhite}>Games Completed</Text>
              <List>
                <ListItem
                  key="Cube game"
                  title="Cube game"
                  titleStyle={material.titleWhite}
                  subtitle="Score: 12"
                  subtitleStyle={material.titleWhite}
                  containerStyle={{ backgroundColor: color.delta_grey }}
                  hideChevron />
                <ListItem
                  title="Shooting game"
                  key="Cube game"
                  titleStyle={material.titleWhite}
                  subtitle="Score: 1"
                  subtitleStyle={material.titleWhite}
                  containerStyle={{ backgroundColor: color.delta_grey }}
                  hideChevron />
              </List>
            </View>
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
