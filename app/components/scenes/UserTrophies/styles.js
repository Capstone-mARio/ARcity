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
    flex: 1
  },

  objectContainer: {
    backgroundColor: color.delta_grey,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  circle: {
    alignSelf: 'center',
    height: 80,
    width: 80,
    // borderRadius: 75,
    margin: 10,
  },

});

export default styles;
