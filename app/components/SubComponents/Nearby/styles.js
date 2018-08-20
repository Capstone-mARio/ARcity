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
    height: normalize(75),
    width: windowWidth - 50,
  },
  containerView: {
    width: windowWidth - 40,
  },

});

export default styles;
