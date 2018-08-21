import React from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { color } from '../../../styles/theme';
import { fetchLocations, postLocation } from '../../../redux/reducers/locationReducer';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import geolib from 'geolib'

import styles from './styles';
import { iOSUIKit, material } from 'react-native-typography';

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const googleMapsQuery = "https://www.google.com/maps/dir/?api=1&origin=";

class NearbyObject extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLat: 0,
      currentLong: 0,
      closestGame: { latitude: 0, longitude: 0 },
    }
    this.findClosest = this.findClosest.bind(this);
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  findClosest() {
    const { currentLat, currentLong, locations } = this.props;
    const distances = locations.map(l => {
      return Number((geolib.getDistance({
                latitude: currentLat,
                longitude: currentLong
              }, {
                latitude: l.latitude,
                longitude: l.longitude,
              }, 100) * 0.000621371).toFixed(5));
    });
    const shortestDistance = Math.min(...distances);
    let closestGame = { latitude: 0, longitude: 0 };
    for(let i = 0; i < locations.length; i ++) {
      if(distances[i] === shortestDistance) {
        closestGame = locations[i];
      }
    }
    return { closestGame, shortestDistance };
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const { closestGame, shortestDistance } = this.findClosest();
    const { currentLat, currentLong, locations } = this.props;
    const itemQuery = `${googleMapsQuery}${currentLat},${currentLong}&destination=${closestGame.latitude},${closestGame.longitude}`;
    console.log("These are the locations", locations);
    return (
        <View style={styles.container}>
        {closestGame.latitude && (
          <List>
              <ListItem
                containerStyle={styles.listItem}
                avatar={{ uri: closestGame.avatar_url }}
                key={closestGame.name}
                title={`Nearby: ${closestGame.name}`}
                titleStyle={material.titleWhite}
                avatarStyle={{ backgroundColor: color.delta_grey }}
                subtitle={`Distance away: ${shortestDistance} mi`}
                subtitleStyle={material.subheadingWhite}
                onPress={() => Linking.openURL(itemQuery) }
                hideChevron
              />

          </List>
        )}
        </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locationReducer.locations,
  currentLat: state.locationReducer.currentLat,
  currentLong: state.locationReducer.currentLong,
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocations()),
  postLocation: location => dispatch(postLocation(location)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyObject);
