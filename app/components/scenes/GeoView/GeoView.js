import React from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';

import { Button, List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GestureRecognizer from 'react-native-swipe-gestures';
import geolib from 'geolib'

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

const googleMapsQuery = "https://www.google.com/maps/dir/?api=1&origin=";

import styles from './styles';

class GeoView extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLat: 0,
      currentLong: 0,
    }
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.success = this.success.bind(this);
  }
  onSwipeLeft() {
    Actions.Profile();
  }

  onSwipeRight() {
    Actions.ARHome();
  }

  success(pos) {
    var crd = pos.coords;
    this.setState({
      currentLat : crd.latitude,
      currentLong: crd.longitude,
    })

  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async componentDidMount(){
    await navigator.geolocation.watchPosition(this.success, this.error, options);
    console.log('position', this.state.position);
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const list = [
      {
        name: 'AR Balloon',
        avatar_url:
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        subtitle: 'Vice President',
        latitude: 40.71,
        longitude: -74,
      },
      {
        name: 'AR Giraffe',
        avatar_url:
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
        subtitle: 'Vice Chairman',
        latitude: 40.70522,
        longitude: -74.00909,
      },
    ];
    const { currentLat, currentLong } = this.state;
    return (
      <GestureRecognizer
        style={styles.container}
        onSwipeLeft={() => this.onSwipeLeft()}
        onSwipeRight={() => this.onSwipeRight()}
        config={config}
      >
        <List>
          {list.map(l => {
            const distance = Number((geolib.getDistance({
                latitude: currentLat,
                longitude: currentLong
              }, {
                latitude: l.latitude,
                longitude: l.longitude,
              }, 100) * 0.000621371).toFixed(3));

            const distanceDisplay = (distance < 0.01 ? 'Look around ;)' : distance.toFixed(2) + ' miles');

            const itemQuery = `${googleMapsQuery}${currentLat},${currentLong}&destination=${l.latitude},${l.longitude}`;

            return <ListItem
              style={styles.listItem}
              avatar={{ uri: l.avatar_url }}
              key={l.name}
              title={l.name}
              avatarStyle={{ backgroundColor: 'white' }}
              subtitle={`Distance away: ${distanceDisplay}`}
              onPress={() => Linking.openURL(itemQuery) }
              hideChevron
            />
          })}
        </List>

        <Text>This is my lat: {this.state.currentLat}</Text>
        <Text>This is my long: {this.state.currentLong}</Text>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

export default connect(
  mapStateToProps,
  {}
)(GeoView);
