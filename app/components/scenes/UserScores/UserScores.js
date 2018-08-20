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
import ObjectModal from '../../SubComponents/ObjectModal/ObjectModal';

import styles from './styles';
import { iOSUIKit, material } from 'react-native-typography';

import { allScores } from './allScores';

class UserScores extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      trophies: allTrophies,
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
    let objects = JSON.parse(this.props.user.objects);
    let newTrophyState = allTrophies.slice();
    objects.forEach(trophy => {
      for (let i = 0; i < newTrophyState.length; i++) {
        if (newTrophyState[i].name === trophy.name) {
          newTrophyState[i].owned = true;
        }
      }
    });
    this.setState({
      trophies: newTrophyState,
    });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={styles.objectContainer}>
          {this.state.trophies.map(trophy => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ selectedObject: trophy });
                  this.toggleModal(true);
                }}
              >
                <Image
                  style={styles.circle}
                  source={trophy.owned ? trophy.trophy : trophy.shadow}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <ObjectModal
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
