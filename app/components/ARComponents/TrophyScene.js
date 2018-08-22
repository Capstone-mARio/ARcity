import { View, TouchableHighlight, Alert, Image } from 'react-native';
import {
  ViroARScene,
  ViroSphere,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

import React from 'react'
import { allTrophies } from '../scenes/UserTrophies/allTrophies';
import { connect } from 'react-redux';



class TrophyScene extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      trophyModels: [],
    }
  }

  componentDidMount(){
    this.setState({trophyModels: this.props.list})
  }

  render(){
    console.log('this is in trophy scene', this.state.trophyModels)
    return (
      <ViroARScene >
        <ViroAmbientLight color="#FFFFFF" />
        {this.props.list}
      </ViroARScene>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  list: state.arCityReducer.list
});

export default connect(mapStateToProps)(TrophyScene);
