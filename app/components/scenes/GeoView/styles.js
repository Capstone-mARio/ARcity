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
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },

  listItem: {
    backgroundColor: color.delta_grey,
  },
  containerView: {
    width: windowWidth - 40,
  },

});

export default styles;
