import { StyleSheet, View } from 'react-native';
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

import React from 'react'
import { allTrophies } from '../scenes/UserTrophies/allTrophies';
import { connect } from 'react-redux';



class TrophyScene extends React.Component {

  constructor(){
    super();
    this.state = {
      trophyObjects: []
    }
    // this.displayObjects = this.displayObjects.bind(this);
  }

  componentDidMount() {
    let objects = JSON.parse(this.props.user.objects);
    let newTrophyState = allTrophies.slice();
    let trophies = []
    objects.forEach(trophy => {
      for (let i = 0; i < newTrophyState.length; i++) {
        if (newTrophyState[i].name === trophy.name && newTrophyState[i].model) {
          trophies.push(newTrophyState[i].model)
        }
      }
    });
    this.setState({
      trophyObjects: trophies,
    });
  }


  render(){
    return (
      <ViroARScene drawBounds={true}>
        <ViroAmbientLight color="#FFFFFF" />
        {this.state.trophyObjects}
      </ViroARScene>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
});

export default connect(mapStateToProps)(TrophyScene);
