import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import { color } from '../../../styles/theme';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import GameModal from '../../SubComponents/GameModal/GameModal';

import styles from './styles';

import { allScores } from './allScores';

import { iOSUIKit, material } from 'react-native-typography';

class UserScores extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      scores: allScores,
      selectedObject: {},
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(bool) {
    this.setState({
      modalVisible: bool,
    });
  }

  componentDidMount() {
    let games = JSON.parse(this.props.user.games);
    let newScoreState = allScores.slice();
    games.forEach(game => {
      for (let i = 0; i < newScoreState.length; i++) {
        if (newScoreState[i].name === game.name) {
          newScoreState[i] = Math.max(newScoreState[i].score, game.score);
        }
      }
    });
    this.setState({
      scores: newScoreState,
    });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={styles.gameContainer}>
          {this.state.scores.map(game => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectedObject: game });
                  this.toggleModal(true);
                }}
              >
                <View style={styles.row}>
                  <Image style={styles.circle} source={game.image} />
                  <View style={styles.rowInfo}>
                    <Text style={material.headlineWhite}>{game.name}</Text>
                    <Text style={material.titleWhite}>{`High Score: ${
                      game.score
                    }`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <GameModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
          selectedObject={this.state.selectedObject}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
});

export default connect(mapStateToProps)(UserScores);
