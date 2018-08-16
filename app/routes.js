import React from 'react';
import {
  Scene,
  Router,
  ActionConst,
  Stack,
  Modal,
  Tabs,
} from 'react-native-router-flux';
import { Text, Image } from 'react-native';
//Authentication Scenes

//Import Store, actions
import store from './redux/store';
import { iOSUIKit, material } from 'react-native-typography';

// Import components
import Welcome from './components/scenes/Welcome/Welcome';
import Login from './components/scenes/Login/Login';
import Register from './components/scenes/Register/Register';
import CompleteProfile from './components/scenes/CompleteProfile/CompleteProfile';
import ARHome from './components/ARComponents/ARHome';
import ForgotPassword from './components/scenes/ForgotPassword/ForgotPassword';
import Profile from './components/scenes/Profile/Profile';
import GeoView from './components/scenes/GeoView/GeoView';

import { color, navTitleStyle } from './styles/theme';

const TabIcon = ({ selected, name, title }) => {
  if (title === 'Geo') {
    return (
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./components/assets/Geo_icon.png')}
      />
    );
  } else if (title === 'Profile') {
    return (
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./components/assets/Profile_icon.png')}
      />
    );
  } else if (title === 'AR') {
    return (
      <Image
        style={{ width: 40, height: 40 }}
        source={require('./components/assets/AR_icon.png')}
      />
    );
  }
};

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      // isLoggedIn: false,
      // exist: false //indicates if user exist in realtime database
    };
  }

  // componentDidMount() {
  //     let _this = this;
  //     store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
  //         _this.setState({isReady: true, exist, isLoggedIn});
  //     }));
  // }

  render() {
    return (
      <Router>
        <Scene
          key="root"
          hideNavBar
          navigationBarStyle={{ backgroundColor: color.delta_grey }}
          titleStyle={material.title}
          backButtonTintColor={color.black}
        >
          <Stack key="Auth">
            <Scene
              key="Welcome"
              component={Welcome}
              title=""
              initial={true}
              hideNavBar
            />
            <Scene key="Login" component={Login} title="" initial={false} />
            <Scene
              key="Register"
              component={Register}
              title=""
              initial={false}
            />
            <Scene
              key="CompleteProfile"
              component={CompleteProfile}
              title=""
              initial={false}
            />
            <Scene
              key="ForgotPassword"
              component={ForgotPassword}
              title="Forgot Password"
            />
          </Stack>
          <Scene key="Main">
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#66d973' }}
              hideNavBar
            >
              <Scene
                key="AR"
                title="AR"
                icon={TabIcon}
                component={ARHome}
                tabBarPosition="bottom"
                initial={false}
                hideNavBar
              />
              <Scene
                key="Profile"
                title="Profile"
                icon={TabIcon}
                component={Profile}
                initial={true}
                hideNavBar
              />
              <Scene
                key="GeoView"
                title="Geo"
                icon={TabIcon}
                component={GeoView}
                initial={false}
                hideNavBar
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

// render() {

//     return (
//         <Router>
//             <Scene key="root" hideNavBar
//                    navigationBarStyle={{backgroundColor: "#fff"}}
//                    titleStyle={navTitleStyle}
//                    backButtonTintColor={color.black}>
//                 <Stack key="Auth" initial={!this.state.isLoggedIn}>
//                     <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
//                     <Scene key="Register" component={Register} title="Register" back/>
//                     <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
//                     <Scene key="Login" component={Login} title="Login"/>
//                     <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
//                 </Stack>

//                 <Stack key="Main" initial={this.state.isLoggedIn}>
//                     <Scene key="Home" component={Virtual} title="Home" initial={true} type={ActionConst.REPLACE}/>
//                 </Stack>
//             </Scene>
//         </Router>
//     )
// }
