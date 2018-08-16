import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createUser, signOut } from '../../../redux/reducers/authReducer';
import AuthTextInput from '../../SubComponents/AuthTextInput';
import { isEmpty, validate } from '../../utils/validate';

import GestureRecognizer from 'react-native-swipe-gestures';
import { iOSUIKit, material } from 'react-native-typography';
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import { color } from '../../../styles/theme';

import styles from './styles';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      username: { type: 'username', value: '' },
      error: { username: '' },
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }
  onSwipeLeft() {
    Actions.ARHome();
  }
  onSwipeRight() {
    Actions.GeoView();
  }
  onSubmit() {
    const data = { username: this.state.username };
    const result = validate(data);
    if (!result.success) {
      this.setState({ error: result.error });
    } else {
      this.props.createUser(
        {
          uid: this.props.user.uid,
          username: data.username.value,
        },
        this.onSuccess,
        this.onError
      );
    }
  }
  onSuccess() {
    this.setState({ edit: false });
  }
  onError(error) {
    if (error.hasOwnProperty('message')) {
      this.setState({ error: error.message });
    }
  }
  onChange(key, text) {
    const state = this.state;
    state[key]['value'] = text;
    this.setState(state);
  }
  componentDidMount() {
    this.setState({
      username: { type: 'username', value: this.props.user.username },
    });
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={() => this.onSwipeLeft()}
        onSwipeRight={() => this.onSwipeRight()}
        config={config}
      >
        <View style={styles.outerContainer}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 80,
                  width: 300,
                  margin: 10,
                }}
                source={require('../../assets/ARcity_name.png')}
              />
            </View>
            <View style={styles.profileContainer}>
              <Image
                style={{
                  alignSelf: 'center',
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                  margin: 3,
                }}
                source={require('../../assets/doge.png')}
              />
              {this.state.edit ? (
                <View style={styles.profileContainer}>
                  <AuthTextInput
                    key="username"
                    label="Username"
                    showLabel={false}
                    placeholder={'Username'}
                    autoFocus={false}
                    onChangeText={text => this.onChange('username', text)}
                    secureTextEntry={false}
                    keyboardType="default"
                    textAlign="center"
                    value={this.state['username']['value']}
                    error={this.state.error.username}
                  />
                  <ResponsiveButton text={'Change'} onPress={this.onSubmit} />
                </View>
              ) : (
                <View style={styles.usernameContainer}>
                  <Text style={material.headlineWhite}>
                    Username: {this.props.user.username}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ edit: true });
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require('../../assets/Create_icon.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
                        <ResponsiveButton
            text={'Logout'}
            onPress={()=>{
              this.props.signOut()
              Actions.Welcome()
            }}
          />
              <Text style={material.headlineWhite}>Games Completed</Text>
              <List>
                <ListItem
                  key="Cube game"
                  title="Cube game"
                  titleStyle={material.titleWhite}
                  subtitle="Score: 12"
                  subtitleStyle={material.titleWhite}
                  containerStyle={{ backgroundColor: color.delta_grey }}
                  hideChevron
                />
                <ListItem
                  title="Shooting game"
                  key="Shooting game"
                  titleStyle={material.titleWhite}
                  subtitle="Score: 1"
                  subtitleStyle={material.titleWhite}
                  containerStyle={{ backgroundColor: color.delta_grey }}
                  hideChevron
                />
              </List>
            </View>
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || {}
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
    signOut: () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
