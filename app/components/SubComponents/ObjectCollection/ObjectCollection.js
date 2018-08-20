import React from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { color } from '../../../styles/theme';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ObjectModal from '../ObjectModal/ObjectModal'


import styles from './styles';
import { iOSUIKit, material } from 'react-native-typography';


const myObjects= [
  { name: 'trophy' },
  { name: 'trophy' },
  { name: 'suitcase' },
  { name: 'suitcase' },
  { name: 'blank' },
  { name: 'blank' },
  { name: 'blank' },
  { name: 'blank' },
  { name: 'blank' },
  { name: 'blank' },
]

class ObjectCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(bool) {
    this.setState({
      modalVisible: bool,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {myObjects.map(object => {
          if(object.name === 'blank') {
            return (
              <Image
                  style={styles.circle}
                  source={require('../../assets/circle_outline.png')}
              />
            )
          } else if(object.name === 'trophy') {
            return (
              <TouchableOpacity
                    onPress={() => {
                      this.toggleModal(true);
                    }}
                  >
                <Image
                    style={styles.circle}
                    source={require('../../assets/trophy_icon.png')}
                />
              </TouchableOpacity>
            )
          } else {
            return (
              <TouchableOpacity
                    onPress={() => {
                      this.toggleModal(true);
                    }}
                  >
                <Image
                    style={styles.circle}
                    source={require('../../assets/suitcase_icon.png')}
                />
              </TouchableOpacity>
            )
          }
        })}

        <ObjectModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locationReducer.locations,
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: (district) => dispatch(fetchLocations(district)),
  postLocation: (district, location) => dispatch(postLocation(district, location)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectCollection);
