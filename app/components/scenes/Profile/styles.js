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
    flexDirection: 'column',
    alignItems: 'center',
  },

  headerContainer: {
    alignItems: 'center',
  },

  profileContainer: {
    alignItems: 'center',
  },
  usernameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: color.delta_grey,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginTop: 50,
  },

  containerView: {
    width: windowWidth - 40,
  },

  button: {
    margin: 10,
    backgroundColor: color.button_color,
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
