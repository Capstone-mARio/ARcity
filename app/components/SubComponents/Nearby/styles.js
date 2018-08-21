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
    marginTop: 20,
    backgroundColor: color.delta_grey,
  },

  textContainer: {
    margin: 10,
  },

  header: {
    alignItems: 'center',
  },

  listComponent: {
    width: windowWidth - 40,
  },

  listItem: {
    backgroundColor: color.delta_grey,
    height: normalize(95),
    width: windowWidth - 100,
    justifyContent: 'center',
  },
  containerView: {
    width: windowWidth - 40,
  },

});

export default styles;
