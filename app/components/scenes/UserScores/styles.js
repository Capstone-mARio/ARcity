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
    flex: 1,
  },

  gameContainer: {
    backgroundColor: color.delta_grey,
    justifyContent: 'flex-start',
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  circle: {
    alignSelf: 'center',
    height: 100,
    width: 100,
    // borderRadius: 75,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowInfo: {
    paddingLeft: '10%',
    flexDirection: 'column',
  },
});

export default styles;
