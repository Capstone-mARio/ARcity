import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { color } from '../../../styles/theme';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

// const objects = [
//       {
//         object: 'AR Giraffe',
//         cost: 12,
//       },
//       {
//         object: 'AR Balloon',
//         cost: 27,
//       },
//       {
//         object: 'AR Monkey',
//         cost: 27,
//       },
//       {
//         object: 'AR Kitty',
//         cost: 270,
//       },
//       {
//         object: 'AR Babboon',
//         cost: 2700,
//       },
//     ];

class GameObjects extends Component {
  constructor() {
    super();
  }

  render() {
    const gameObjects = JSON.parse(this.props.user.objects);
    return (
      gameObjects &&
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <List style={styles.list}>
            {gameObjects.map(object => {
              return <ListItem
                      containerStyle={styles.listItem}
                      avatar={require('../../assets/planet_icon_white.png')}
                      key={object.game}
                      title={`Object: ${object.object}`}
                      titleStyle={material.titleWhite}
                      avatarStyle={styles.avatar}
                      subtitle={`Cost: ${object.cost}`}
                      subtitleStyle={material.subheadingWhite}
                      hideChevron
                    />
            })}
          </List>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || {games:'[]', objects:'[]', coins:0}
});

export default connect(
  mapStateToProps,
  {}
)(GameObjects);
