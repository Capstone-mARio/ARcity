import { StyleSheet } from 'react-native';

import {
  color,
  padding,
  windowWidth,
  normalize,
  fontSize,
  fontFamily,
} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.delta_grey,
  },

  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },

  errorText: {
    color: color.red,
    width: windowWidth - 45,
    marginTop: 20,
  },

  containerView: {
    marginVertical: padding * 3,
    width: windowWidth - 40,
  },

  socialButton: {
    height: normalize(55),
    borderRadius: 4,
    marginTop: 0,
    marginBottom: 0,
  },

  button: {
    margin: 10,
    backgroundColor: color.button_color,
    height: normalize(55),
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.medium,
  },

  forgotText: {
    textAlign: 'center',
    color: color.black,
    marginBottom: padding,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.medium,
  },
});

export default styles;
