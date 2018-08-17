import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { color } from '../../../styles/theme';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

// const scores = [
//       {
//         game: 'Cube game',
//         score: 12,
//       },
//       {
//         game: 'Shooting game',
//         score: 27,
//       },
//       {
//         game: 'Cube game',
//         score: 12,
//       },
//       {
//         game: 'Shooting game',
//         score: 27,
//       },
//     ];

class GameScore extends React.Component {
  constructor() {
    super();
  }

  render() {
    const gameScores = JSON.parse(this.props.user.games);
    return (
      (gameScores &&
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <List style={styles.list}>
            {gameScores.map(score => {
              return <ListItem
                      containerStyle={styles.listItem}
                      avatar={require('../../assets/plane_icon_white.png')}
                      key={score.game}
                      title={`Game: ${score.game}`}
                      titleStyle={material.titleWhite}
                      avatarStyle={styles.avatar}
                      subtitle={`Score: ${score.score}`}
                      subtitleStyle={material.subheadingWhite}
                      hideChevron
                    />
            })}
          </List>
        </ScrollView>
      </View>)
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || {games:'[]', objects:'[]', coins:0}
});

export default connect(
  mapStateToProps,
  {}
)(GameScore);
