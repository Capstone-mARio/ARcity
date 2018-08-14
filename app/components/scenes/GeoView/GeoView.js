import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';

// import {actions as auth} from "../../index"
// const {} = auth;

import styles from './styles';

class GeoView extends React.Component {
  onSwipeLeft() {
    Actions.Profile();
  }
  onSwipeRight() {
    Actions.ARHome();
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const list = [
      {
        name: 'Amy Farha',
        avatar_url:
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        subtitle: 'Vice President',
      },
      {
        name: 'Chris Jackson',
        avatar_url:
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        subtitle: 'Vice Chairman',
      },
    ];
    return (
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={() => this.onSwipeLeft()}
        onSwipeRight={() => this.onSwipeRight()}
        config={config}
      >
        <List>
          {list.map(l => (
            <ListItem
              avatar={{ uri: l.avatar_url }}
              key={l.name}
              title={l.name}
              avatarStyle={{ backgroundColor: 'white' }}
            />
          ))}
        </List>
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
)(GeoView);
