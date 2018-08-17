import { StyleSheet } from 'react-native';

import {
  windowWidth,
  fontSize,
  fontFamily,
  normalize,
} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },

  inputContainer: {
    width: windowWidth - 40,
    height: normalize(45),
    borderBottomColor: '#A5A7A9',
  },
});

export default styles;
