import { StyleSheet } from 'react-native';
import { padding, color, fontSize, fontFamily, windowWidth, normalize } from "../../../styles/theme";


const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.delta_gray,
    },

    containerView:{
        width: windowWidth - 40
    },

  button: {
    margin: 10,
    backgroundColor: color.button_color,
    height: normalize(55),
  },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
    },

});

export default styles;
