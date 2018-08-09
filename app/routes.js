import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';


//Authentication Scenes

//Import Store, actions
import store from './redux/store'
// import { checkLoginStatus } from "../modules/auth/actions";

// Import components
import Welcome from './components/scenes/Welcome/Welcome';
import ARHome from './components/ARComponents/ARHome';

import { color, navTitleStyle } from "./styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            // isLoggedIn: false,
            // exist: false //indicates if user exist in realtime database
        }
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
              <Scene key="root" hideNavBar
                     navigationBarStyle={{backgroundColor: "#fff"}}
                     titleStyle={navTitleStyle}
                     backButtonTintColor={color.black}>
                  <Stack key="Auth">
                      <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                      <Scene key="ARHome" component={ARHome} title="" initial={false} hideNavBar/>
                  </Stack>
              </Scene>
          </Router>
      )
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
