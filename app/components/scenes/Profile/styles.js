import { StyleSheet } from 'react-native';
import {
  padding,
  color,
  fontSize,
  fontFamily,
  windowWidth,
  windowHeight,
  normalize,
} from '../../../styles/theme';

const resizeMode = 'contain';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: color.delta_grey,
  },

  container: {
    backgroundColor: color.delta_grey,
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  headerContainer: {
    alignItems: 'center',
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },

  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  logo: {
    alignSelf: 'center',
    height: 80,
    width: 300,
    margin: 10,
  },

  doge: {
    height: 280,
    width: 210,
    // borderRadius: 75,
    margin: 3,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5
  },

  containerView: {
    width: windowWidth - 40,
  },

  subtab: {
    margin: 10,
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

  tabContainer: {
  },

  contentContainer: {
    paddingVertical: 20
  }
});

export default styles;
