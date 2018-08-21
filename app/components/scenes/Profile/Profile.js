import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  createUser,
  signOut,
  instructionsVisible,
  menuVisible,
} from '../../../redux/reducers/authReducer';

import AuthTextInput from '../../SubComponents/AuthTextInput';
import { isEmpty, validate } from '../../utils/validate';
import ResponsiveButton from '../../SubComponents/ResponsiveButton';
import InstructionModal from '../Instructions/Instructions';
import NearbyObject from '../../SubComponents/Nearby/NearbyObject';

import { material } from 'react-native-typography';
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
          coins: this.props.user.coins,
          games: this.props.user.games,
          objects: this.props.user.objects,
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
    return (
      <View style={styles.container}>
        <View style={styles.outerContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/ARcity_name.png')}
            />
          </View>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={() => this.props.instructionsVisible(true, false)}
            >
              <Image
                style={styles.doge}
                source={require('../../assets/doge.png')}
              />
            </TouchableOpacity>
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
                      width: 30,
                      height: 30,
                    }}
                    source={require('../../assets/Create_icon.png')}
                  />
                </TouchableOpacity>
              </View>
            )}

            { !this.state.edit && (<NearbyObject />)}

            <InstructionModal />

          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  instructions: state.authReducer.instructions,
  id: state.locationReducer.id,
});

const mapDispatchToProps = dispatch => ({
  createUser: (user, success, error) =>
    dispatch(createUser(user, success, error)),
  signOut: () => dispatch(signOut()),
  instructionsVisible: (instructions, initial) => dispatch(instructionsVisible(instructions, initial)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
