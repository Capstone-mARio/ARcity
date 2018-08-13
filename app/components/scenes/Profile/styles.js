import { StyleSheet } from 'react-native';
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
    backgroundColor: color.white,
  },
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: color.white,
    flexDirection: 'column',
    alignItems: 'center',
  },

  containerView: {
    width: windowWidth - 40,
  },

  button: {
    backgroundColor: '#FF553F',
    height: normalize(55),
  },

  buttonText: {
    fontSize: fontSize.regular + 2,
    fontFamily: fontFamily.bold,
  },

  outer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default styles;
