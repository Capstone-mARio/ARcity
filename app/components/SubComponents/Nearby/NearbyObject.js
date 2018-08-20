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
      closestGame: {},
    }
    this.success = this.success.bind(this);
    this.findClosest = this.findClosest.bind(this);
  }

  success(pos) {
    var crd = pos.coords;
    this.setState({
      currentLat : crd.latitude,
      currentLong: crd.longitude,
    })

    this.findClosest();

  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async componentDidMount(){
    await this.props.fetchLocations();
    await navigator.geolocation.watchPosition(this.success, this.error, options);

  }

  findClosest() {
    const { currentLat, currentLong } = this.state;
    const { locations } = this.props;
    const distances = locations.map(l => {
      return Number((geolib.getDistance({
                latitude: currentLat,
                longitude: currentLong
              }, {
                latitude: l.latitude,
                longitude: l.longitude,
              }, 100) * 0.000621371).toFixed(5));
    });
    console.log("distances:", distances);
    console.log("spread distances", ...distances);
    const shortestDistance = Math.min(...distances);
    console.log("This is the shortest distance", shortestDistance);
    // find the object, set it to state
    // do this at an
    let closestGame;
    for(let i = 0; i < locations.length; i ++) {
      if(distances[i] === shortestDistance) {
        closestGame = locations[i];
      }
    }

    this.setState({
      closestGame,
      shortestDistance
    });

    console.log("This is the new state:", this.state);
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const { currentLat, currentLong, closestGame, shortestDistance } = this.state;
    const itemQuery = `${googleMapsQuery}${currentLat},${currentLong}&destination=${closestGame.latitude},${closestGame.longitude}`;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={material.display2White}>
            Closest Game:
          </Text>
        </View>
        <List>
            <ListItem
              containerStyle={styles.listItem}
              avatar={{ uri: closestGame.avatar_url }}
              key={closestGame.name}
              title={closestGame.name}
              titleStyle={material.titleWhite}
              avatarStyle={{ backgroundColor: color.delta_grey }}
              subtitle={`Distance away: ${shortestDistance} mi`}
              subtitleStyle={material.subheadingWhite}
              onPress={() => Linking.openURL(itemQuery) }
              hideChevron
            />

        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.locationReducer.locations,
});

const mapDispatchToProps = dispatch => ({
  fetchLocations: () => dispatch(fetchLocations()),
  postLocation: location => dispatch(postLocation(location)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyObject);
