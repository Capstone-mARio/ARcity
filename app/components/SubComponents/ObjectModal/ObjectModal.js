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
              Item: AR Giraffe
            </Text>

            <Text style={material.headlineWhite}>
              Cost: 800 Dogecoin
            </Text>

            <Image
                style={styles.circle}
                source={require('../../assets/suitcase_icon.png')}
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
