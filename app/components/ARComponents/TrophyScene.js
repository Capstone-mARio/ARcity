import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroQuad,
  ViroSphere,
  ViroMaterials,
  ViroNode,
  ViroText,
  ViroConstants,
  ViroCamera,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

class TrophyScene extends Component {

  constructor(){
    super();
  }

  render(){
    <ViroARScene >
      <Viro3DObject
        position={[0,0,0]}
        source={require('./res/traffic_cone/cone1_obj.obj')}
        materials={'traffic_cone'}
        type='OBJ'
        onPinch={this._onPinch}
      />
    </ViroARScene>

  }



}
