import React, { Component } from 'react';
import {TouchableHighlight, View, Image, Alert } from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import TrophyScene from './TrophyScene'
import { connect } from 'react-redux';
import { allTrophies } from '../scenes/UserTrophies/allTrophies';
import { setObjList } from '../../redux/reducers/arCityReducer';

class TrophyRender extends Component {

  constructor(props){
    super(props);
    this.state= {
      trophyObjects: [],
      trophyModels: [],
    }
    this._onDisplayDialog = this._onDisplayDialog.bind(this)
    this._onPress = this._onPress.bind(this)
  }

  componentDidMount() {
    let objects = JSON.parse(this.props.user.objects);
    let newTrophyState = allTrophies.slice();
    let trophies = []
    objects.forEach(trophy => {
      for (let i = 0; i < newTrophyState.length; i++) {
        if (newTrophyState[i].name === trophy.name && newTrophyState[i].model) {
          trophies.push({
            text: newTrophyState[i].name,
            onPress: () => this._onPress(newTrophyState[i].model)
          })
        }
      }
    });
    this.setState({
      trophyObjects: trophies,
    });
  }

  render() {
    console.log('in Trophy render', this.state.trophyModels)
    return (
      <View style={{ flex: 1 }}>
        <ViroARSceneNavigator apiKey={process.env.viroKey} initialScene={{ scene: TrophyScene}}/>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 77, alignItems: 'center' }}>
          <TouchableHighlight
            onPress={() => this._onDisplayDialog()}
            underlayColor={'#00000000'} >
            <Image source={require("../ARComponents/res/btn_mode_objects.png")} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  _onDisplayDialog(){
    Alert.alert(
      'Choose an object',
      'Select an object to add to your trophy scene!',
      this.state.trophyObjects
    )
  }
  _onPress(model){
    this.setState({trophyModels: [...this.state.trophyModels, model]});
    this.props.setObjList(model);
  }
}



const mapStateToProps = state => ({
  user: state.authReducer.user || { games: '[]', objects: '[]', coins: 0 },
  instructions: state.authReducer.instructions,
});

const mapDispatchToProps = dispatch => ({
  setObjList: (list) => dispatch(setObjList(list)),
})

export default connect(mapStateToProps,mapDispatchToProps)(TrophyRender);

