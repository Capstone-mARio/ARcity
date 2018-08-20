import React, { Component } from 'react';
import { Text, TouchableHighlight, View, Image } from 'react-native';
import Modal from "react-native-modal";
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import ResponsiveCircleButton from '../../SubComponents/ResponsiveCircleButton';
import SubTab from '../../SubComponents/SubTab';
import Dogecoins from './Dogecoins';
import { Actions } from 'react-native-router-flux';
import { instructionsVisible, signOut } from '../../../redux/reducers/authReducer';
import { connect } from 'react-redux';

import styles from './styles';
import { material } from 'react-native-typography';

const DogeComponent = () => (
  <Image
    style={{
      alignSelf: 'center',
      height: 250,
      width: 250,
      borderRadius: 25,
      margin: 3
    }}
    source={{ uri: "https://t0.rbxcdn.com/e52cb522d35f416581a8bd81b90904ca" }}
  />
)

const defaultState = {
    menu: true,
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
}

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }
  render() {
    console.log("hello");
    return (
      <View style={styles.container}>
        <Modal
          isVisible={this.props.instructions}
          onBackdropPress={() => {
            this.setState(defaultState);
            this.props.instructionsVisible(false);
          }}
          backdropOpacity={0.88}
          >

          {(this.state.menu &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Dogecoins />

              <ResponsiveButton
                text="View instructions"
                onPress={() => this.setState({ menu: false, first: true }) }
              />
              <ResponsiveButton
                text="High Scores"
                onPress={() => {
                  Actions.Welcome();
                  this.props.signOut();
                  this.props.instructionsVisible(false);
                }}
              />
              <ResponsiveButton
                text="Trophies"
                onPress={() => {
                  Actions.Welcome();
                  this.props.signOut();
                  this.props.instructionsVisible(false);
                }}
              />
              <ResponsiveButton
                text="Sign out"
                onPress={() => {
                  Actions.Welcome();
                  this.props.signOut();
                  this.props.instructionsVisible(false);
                }}
              />
            </View>)}

          {(this.state.first &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.headlineWhite}>
                Welcome to ARcity! I'm Doge, I'll be your guide on today's journey! To learn the rules of the game, much press next...
              </Text>
              <DogeComponent />
              <View style={styles.buttonContainer}>
                <ResponsiveCircleButton
                  text="Prev"
                  onPress={() => this.setState({ menu: true, first: false })}
                />
                <ResponsiveCircleButton
                  text="Next"
                  onPress={() => this.setState({ first: false, second: true })}
                />
              </View>
            </View>)}

           {(this.state.second &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.headlineWhite}>
                This is very augmented-reality mini-game series, right here in FiDi! All you'll need is yourself and your phone. The rules are simple: find and complete all the mini-games, and you win!
              </Text>
              <DogeComponent />
              <View style={styles.buttonContainer}>
                <ResponsiveCircleButton
                  text="Prev"
                  onPress={() => this.setState({ first: true, second: false })}
                />
                <ResponsiveCircleButton
                  text="Next"
                  onPress={() => this.setState({ second: false, third: true })}
                />
              </View>
            </View>)}

           {(this.state.third &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.headlineWhite}>
                Wow, much catch: You have to find the coins! They are all around you, floating in space in FiDi. After you collect enough coins to play each game, and are able to win, you get a special item!
              </Text>
              <DogeComponent />
              <View style={styles.buttonContainer}>
                <ResponsiveCircleButton
                  text="Prev"
                  onPress={() => this.setState({ second: true, third: false })}
                />
                <ResponsiveCircleButton
                  text="Next"
                  onPress={() => this.setState({ third: false, fourth: true })}
                />
              </View>
            </View>)}

           {(this.state.fourth &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.headlineWhite}>
                These items are suuuuper rare and worth much dogecoin. You can even use excess coins to purchase items from our store!
              </Text>
              <DogeComponent />
              <View style={styles.buttonContainer}>
                <ResponsiveCircleButton
                  text="Prev"
                  onPress={() => this.setState({ third: true, fourth: false })}
                />
                <ResponsiveCircleButton
                  text="Next"
                  onPress={() => this.setState({ fourth: false, fifth: true })}
                />
              </View>
            </View>)}

           {(this.state.fifth &&
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={material.headlineWhite}>
                Hit exit and GO PLAY!!
              </Text>
              <DogeComponent />
              <ResponsiveButton
                text="Exit"
                onPress={() => {
                  this.setState(defaultState);
                  this.props.instructionsVisible(false);
                }}
              />
            </View>)}

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
)(Instructions);
