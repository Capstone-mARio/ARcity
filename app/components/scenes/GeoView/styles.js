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
    flex: 1,
    backgroundColor: color.delta_grey,
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

  logo: {
    alignSelf: 'center',
    height: 55,
    width: 240,
    margin: 10,
  },

  list: {
    backgroundColor: color.delta_grey,
  },

  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },

  listItem: {
    backgroundColor: color.delta_grey,
    height: normalize(95),
    justifyContent: 'center',
  },
  containerView: {
    width: windowWidth - 40,
  },

});

export default styles;
