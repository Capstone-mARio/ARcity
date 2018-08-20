import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image } from 'react-native';
import Modal from "react-native-modal";
import ResponsiveButton from '../../SubComponents/ResponsiveButton';

import { menuVisible, instructionsFromMenu, signOut } from '../../../redux/reducers/authReducer';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

class Menu extends Component {

  constructor() {
    super();
    this.viewInstructions = this.viewInstructions.bind(this);
  }

  viewInstructions() {
    this.props.instructionsFromMenu(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.props.menu}
          onBackdropPress={() => this.props.menuVisible(false)}
          backdropOpacity={0.88}
          >

          <ResponsiveButton
            text="Sign out"
            onPress={() => this.props.signOut() }
          />

          <ResponsiveButton
            text="View instructions"
            onPress={() => this.viewInstructions() }
          />

        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.authReducer.menu,
});

const mapDispatchToProps = dispatch => ({
  instructionsFromMenu: bool => dispatch(instructionsFromMenu(bool)),
  menuVisible: bool => dispatch(menuVisible(bool)),
  signOut: () => dispatch(signOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
