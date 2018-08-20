import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image } from 'react-native';
import Modal from "react-native-modal";
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import ResponsiveCircleButton from '../../SubComponents/ResponsiveCircleButton';
import SubTab from '../../SubComponents/SubTab';
import GameScore from '../../SubComponents/GameScore/GameScore';
import GameObjects from '../../SubComponents/GameObjects/GameObjects';
import { Actions } from 'react-native-router-flux';
import { instructionsVisible, signOut } from '../../../redux/reducers/authReducer';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';


class ObjectModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let trophy = this.props.selectedObject
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
                source={trophy.owned? trophy.trophy:trophy.shadow}
            />
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
)(ObjectModal);
