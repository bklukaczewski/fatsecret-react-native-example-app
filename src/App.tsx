import React from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import AppWithNavigationState from './navigators/MainStackNavigator';
import AppReducer from './reducers';

export default class App extends React.Component {

  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
