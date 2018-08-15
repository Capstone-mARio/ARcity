import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { isEmpty } from '../utils/validate';
import styles from './AuthTextInputStyles';
import { iOSUIKit, material } from 'react-native-typography';

class AuthTextInput extends Component {
  render() {
    const {
      showLabel,
      placeholder,
      autoFocus,
      onChangeText,
      secureTextEntry,
      placeholderTextColor,
      keyboardType,
    } = this.props;

    return (
      <View style={styles.container}>
        {showLabel && <FormLabel>{this.props.label}</FormLabel>}
        <FormInput
          autoCapitalize="none"
          clearButtonMode="while-editing"
          underlineColorAndroid={'#fff'}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          containerStyle={styles.inputContainer}
          inputStyle={material.titleWhite}
          placeholderTextColor={'grey'}
          keyboardType={keyboardType}
          value={this.props.value}
        />
        {!isEmpty(this.props.error) && (
          <FormValidationMessage>{this.props.error}</FormValidationMessage>
        )}
      </View>
    );
  }
}

AuthTextInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string,
};

AuthTextInput.defaultProps = {
  autoFocus: false,
  secureTextEntry: false,
  placeholderTextColor: 'grey',
  keyboardType: 'default',
};

export default AuthTextInput;
