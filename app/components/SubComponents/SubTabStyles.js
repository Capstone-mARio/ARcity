import { StyleSheet } from 'react-native';

import {
  color,
  padding,
  windowWidth,
  normalize,
  fontSize,
  fontFamily,
} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.delta_grey,
  },

  bitcoin: {
    height: 100,
    width: 100,
  }
});

export default styles;

