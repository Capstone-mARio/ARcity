import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import ResponsiveCircleButton from '../../SubComponents/ResponsiveCircleButton';
import SubTab from '../../SubComponents/SubTab';
import GameScore from '../../SubComponents/GameScore/GameScore';
import GameObjects from '../../SubComponents/GameObjects/GameObjects';
import { Actions } from 'react-native-router-flux';
import {
  createUser,
  instructionsVisible,
  signOut,
} from '../../../redux/reducers/authReducer';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

class ObjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owned: props.selectedObject.owned,
    };
    this.onError = this.onError.bind(this);
  }

  onError(error) {
    if (error.hasOwnProperty('message')) {
      this.setState({ error: error.message });
    }
  }

  render() {
    let trophy = this.props.selectedObject;
    let money = this.props.user.coins;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.props.modalVisible}
          onBackdropPress={() => {
            this.props.toggleModal(false);
          }}
          backdropOpacity={0.88}
        >
          <View style={styles.content}>
            <Text style={material.headlineWhite}>
              {trophy.owned ? trophy.name : '???'}
            </Text>

            <Text style={material.headlineWhite}>
              Cost: {trophy.cost} Dogecoin
            </Text>

            <Image
              style={styles.circle}
              source={trophy.owned ? trophy.trophy : trophy.shadow}
            />
            {trophy.owned ? (
              <ResponsiveButton text="View in 3D" />
            ) : (
              <ResponsiveButton
                text={
                  money >= trophy.cost
                    ? 'Buy now!'
                    : `You need ${trophy.cost - money} more coins`
                }
                onPress={() => {
                  if (money >= trophy.cost) {
                    trophy.owned = true;
                    let prevObjects = JSON.parse(this.props.user.objects);
                    prevObjects.push({ name: trophy.name, cost: trophy.cost });
                    this.props.createUser(
                      {
                        uid: this.props.user.uid,
                        username: this.props.user.username,
                        coins: this.props.user.coins,
                        games: this.props.user.games,
                        objects: JSON.stringify(prevObjects),
                      },
                      this.props.onSuccess,
                      this.onError
                    );
                  }
                }}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  instructions: state.authReducer.instructions,
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
  instructionsVisible: bool => dispatch(instructionsVisible(bool)),
  signOut: () => dispatch(signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectModal);
