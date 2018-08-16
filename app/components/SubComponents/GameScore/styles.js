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
  container: {
    backgroundColor: color.delta_grey,
    height: 300,
  },

  listComponent: {
    width: windowWidth - 40,
  },

  list: {
    backgroundColor: color.delta_grey,
    paddingBottom: 100,
  },

  avatar: {
    backgroundColor: color.delta_grey,
  },

  listItem: {
    backgroundColor: color.delta_grey,
  },

  containerView: {
    width: windowWidth - 40,
  },

  contentContainer: {
  }

});

export default styles;
