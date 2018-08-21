import trophyTrophy from '../../assets/trophy/trophy.png';
import trophyShadow from '../../assets/shadow/trophy.png';
import suitcaseTrophy from '../../assets/trophy/suitcase.png';
import suitcaseShadow from '../../assets/shadow/suitcase.png';
import coinTrophy from '../../assets/trophy/coin.png';
import coinShadow from '../../assets/shadow/coin.png';
import fireballTrophy from '../../assets/trophy/fireball.png';
import fireballShadow from '../../assets/shadow/fireball.png';
import cubeTrophy from '../../assets/trophy/cube.png';
import cubeShadow from '../../assets/shadow/cube.png';
import mugTrophy from '../../assets/trophy/mug.png';
import mugShadow from '../../assets/shadow/mug.png';
import carTrophy from '../../assets/trophy/car.png';
import carShadow from '../../assets/shadow/car.png';
import guitarTrophy from '../../assets/trophy/guitar.png';
import guitarShadow from '../../assets/shadow/guitar.png';
import phoneTrophy from '../../assets/trophy/phone.png';
import phoneShadow from '../../assets/shadow/phone.png';
import coneTrophy from '../../assets/trophy/cone.png';
import coneShadow from '../../assets/shadow/cone.png';
import asteroidTrophy from '../../assets/trophy/asteroid.png';
import asteroidShadow from '../../assets/shadow/asteroid.png';
import icecreamTrophy from '../../assets/trophy/icecream.png';
import icecreamShadow from '../../assets/shadow/icecream.png';
import taxiTrophy from '../../assets/trophy/taxi.png';
import taxiShadow from '../../assets/shadow/taxi.png';
import pretzelTrophy from '../../assets/trophy/pretzel.png';
import pretzelShadow from '../../assets/shadow/pretzel.png';
import hotdogTrophy from '../../assets/trophy/hotdog.png';
import hotdogShadow from '../../assets/shadow/hotdog.png';
import laptopTrophy from '../../assets/trophy/laptop.png';
import laptopShadow from '../../assets/shadow/laptop.png';
import dogTrophy from '../../assets/trophy/dog.png';
import dogShadow from '../../assets/shadow/dog.png';


import React from 'react'
import {Viro3DObject, ViroMaterials, ViroSphere, ViroBox} from 'react-viro'

ViroMaterials.createMaterials({
  traffic_cone: {
    diffuseTexture: require('../../ARComponents/res/traffic_cone/cone1.jpg')
  },
  ball_color: {
    diffuseTexture: require('../../ARComponents/res/object_sphere/ball_texture.png')
  },
  trophy_cube: {
    diffuseTexture: require('../../ARComponents/res/trophyCube_texture.jpg')
  }
});


export const allTrophies = [
  {
    name: 'Trophy',
    owned: false,
    cost: 200,
    trophy: trophyTrophy,
    shadow: trophyShadow,
  },
  {
    name: 'Suitcase',
    owned: false,
    cost: 100,
    trophy: suitcaseTrophy,
    shadow: suitcaseShadow,
    model: <Viro3DObject
            source={require('../../assets/suitcase/Vintage_Suitcase_LP.vrx')}
            position={[-4, 0, -2]}
            scale={[.01, .01, .01]}
            rotation={[-90, 0, 0]}
            onDrag={()=>{}}
            type="VRX"
            />
  },
  {
    name: 'Coin',
    owned: false,
    cost: 1,
    trophy: coinTrophy,
    shadow: coinShadow,
    model: <Viro3DObject
            source={require('../../assets/coin/dogecoin.vrx')}
            position={[-2, 0, -2]}
            scale={[0.001, 0.001, 0.001]}
            rotation={[-90, 0, 0]}
            onDrag={()=>{}}
            type="VRX"
            />
  },
  {
    name: 'Fireball',
    owned: false,
    cost: 500,
    trophy: fireballTrophy,
    shadow: fireballShadow,
    model: <ViroSphere
        position={[2, 0, -2]}
        heightSegmentCount={5}
        widthSegementCount={5}
        radius={.1}
        materials={['ball_color']}
        onDrag={() => {}}
        />
  },
  {
    name: 'Cube',
    owned: false,
    cost: 500,
    trophy: cubeTrophy,
    shadow: cubeShadow,
    model: <ViroBox
            position={[4, 0, -2]}
            height={1}
            width={1}
            length={1}
            materials={'trophy_cube'}
            onDrag={()=>{}}
          />
  },
  {
    name: 'Mug',
    owned: false,
    cost: 1000,
    trophy: mugTrophy,
    shadow: mugShadow,
    model: <Viro3DObject
              position={[6,0,-2]}
              scale={[1,1,1]}
              source={require('../../ARComponents/res/coffee_mug/object_coffee_mug.vrx')}
              onDrag={()=>{}}
              type="VRX"
           />
  },
  {
    name: 'Car',
    owned: false,
    cost: 10000,
    trophy: carTrophy,
    shadow: carShadow,
    model: <Viro3DObject
            source={require('../../ARComponents/res/audi/Audi_R8_2017.vrx')}
            position={[-6,0,-2]}
            scale={[.01, .01,.01]}
            type={"VRX"}
            onDrag={() => {}}
            />
  },
  {
    name: 'Guitar',
    owned: false,
    cost: 5000,
    trophy: guitarTrophy,
    shadow: guitarShadow,
  },
  {
    name: 'Phone',
    owned: false,
    cost: 8000,
    trophy: phoneTrophy,
    shadow: phoneShadow,
  },
  {
    name: 'Cone',
    owned: false,
    cost: 100000,
    trophy: coneTrophy,
    shadow: coneShadow,
    model: <Viro3DObject
      position={[0, 0, -2]}
      source={require('../../ARComponents/res/traffic_cone/cone.obj')}
      materials={'traffic_cone'}
      type='OBJ'
      scale={[.01,.01,.01]}
      onDrag={() => {}}
      // onPinch={this._onPinch}
    />
  },
  {
    name: 'Asteroid',
    owned: false,
    cost: 1000,
    trophy: asteroidTrophy,
    shadow: asteroidShadow,
  },
  {
    name: 'Ice Cream',
    owned: false,
    cost: 500,
    trophy: icecreamTrophy,
    shadow: icecreamShadow,
  },
  {
    name: 'Taxi',
    owned: false,
    cost: 1000,
    trophy: taxiTrophy,
    shadow: taxiShadow,
  },
  {
    name: 'Pretzel',
    owned: false,
    cost: 2000,
    trophy: pretzelTrophy,
    shadow: pretzelShadow,
  },
  {
    name: 'Hotdog',
    owned: false,
    cost: 3000,
    trophy: hotdogTrophy,
    shadow: hotdogShadow,
  },
  {
    name: 'Laptop',
    owned: false,
    cost: 1500,
    trophy: laptopTrophy,
    shadow: laptopShadow,
  },
  {
    name: 'Dog',
    owned: false,
    cost: 300000,
    trophy: dogTrophy,
    shadow: dogShadow,
  },
  {
    name: 'Unknown',
    owned: false,
    cost: '???',
    trophy: trophyShadow,
    shadow: trophyShadow,
  },
  {
    name: 'Unknown',
    owned: false,
    cost: '???',
    trophy: trophyShadow,
    shadow: trophyShadow,
  },
  {
    name: 'Unknown',
    owned: false,
    cost: '???',
    trophy: trophyShadow,
    shadow: trophyShadow,
  },
  {
    name: 'Unknown',
    owned: false,
    cost: '???',
    trophy: trophyShadow,
    shadow: trophyShadow,
  },
];
