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

const fakeLocation = {
  object: "AR Giraffe",
  latitude: 40.71,
  longitude: -74,
  avatar_url:
          'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
}

const googleMapsQuery = "https://www.google.com/maps/dir/?api=1&origin=";

class GeoView extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLat: 0,
      currentLong: 0,
    }
    this.success = this.success.bind(this);
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
    await this.props.fetchLocations("FiDi");
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const { currentLat, currentLong } = this.state;
    const { locations } = this.props;
    return (
      <View style={styles.container}>
        <List>
          {locations.map(l => {
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
                    containerStyle={styles.listItem}
                    avatar={{ uri: l.avatar_url }}
                    key={l.object}
                    title={l.object}
                    titleStyle={material.titleWhite}
                    avatarStyle={{ backgroundColor: color.delta_grey }}
                    subtitle={`Distance away: ${distanceDisplay}`}
                    subtitleStyle={material.subheadingWhite}
                    onPress={() => Linking.openURL(itemQuery) }
                    hideChevron
                  />
          })}
        </List>
        <View style={styles.textContainer}>
          <Text style={material.titleWhite}>This is my lat: {this.state.currentLat}</Text>
          <Text style={material.titleWhite}>This is my long: {this.state.currentLong}</Text>
        </View>
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
)(GeoView);
