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
    backgroundColor: color.white,
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
    height: '20%',
    width: '80%',
    marginTop: 10,
    backgroundColor: 'red',
  },
  containerView: {
    width: windowWidth - 40,
  },

  button: {
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
  title: {
    padding: 30,
    fontSize: 50,
  },
  username: {
    fontSize: 30,
    paddingBottom: 30,
  },
});

export default styles;
