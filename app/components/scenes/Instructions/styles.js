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
    paddingBottom: 20,
    height: windowHeight,
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  dogeContainer: {
    justifyContent: 'center',
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

  dogecoin: {
    height: 200,
    width: 200,
  },

  logo: {
    alignSelf: 'center',
    height: 80,
    width: 300,
    margin: 10,
  },

  doge: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 3,
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
    height: normalize(35),
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: -50,
    flexDirection: 'row',
    justifyContent: 'center',
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
    margin: 20,
  },

  contentContainer: {
    paddingVertical: 20
  }
});

export default styles;
