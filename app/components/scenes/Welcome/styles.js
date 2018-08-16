import { StyleSheet } from 'react-native';
import { iOSUIKit, material } from 'react-native-typography'
import {
  padding,
  color,
  fontSize,
  fontFamily,
  windowWidth,
  normalize,
} from '../../../styles/theme';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.delta_grey,

  },
  container: {
    flex: 1,
    backgroundColor: color.delta_grey,
    flexDirection: 'column',
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',

  },

  containerView: {
    width: windowWidth - 40,
  },

  button: {
    margin: 10,
    backgroundColor: color.button_color,
    height: normalize(55),
  },

  outer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  image: {
    flex: 3,
    width: null,
    height: 220,
    resizeMode: 'stretch',
  }
});

export default styles;
