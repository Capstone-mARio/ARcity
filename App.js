import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './app/routes'
import store from './app/redux/store';
import { color } from './app/styles/theme';


export default class App extends Component {
    render() {
      return (
        <Provider store={store}>
            <Router />
        </Provider>
      );
    }
}
