import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import {
  instructionsVisible,
  signOut,
} from '../../../redux/reducers/authReducer';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

class GameModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let game = this.props.selectedObject;
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
            <Text style={material.headlineWhite}>{game.name}</Text>

            <Text style={material.headlineWhite}>High Score: {game.score}</Text>

            <Image style={styles.circle} source={game.image} />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  instructions: state.authReducer.instructions,
});

const mapDispatchToProps = dispatch => ({
  instructionsVisible: bool => dispatch(instructionsVisible(bool)),
  signOut: () => dispatch(signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameModal);
