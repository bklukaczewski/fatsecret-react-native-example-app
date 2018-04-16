import React from 'react';

import * as Expo from 'expo';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import AppWithNavigationState from './navigators/MainStackNavigator';
import AppReducer from './reducers';

interface Props { }
interface State {
  isReady: boolean;
}

export default class App extends React.Component<Props, State> {

  store = createStore(AppReducer);
  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      MaterialIcons: require('@expo/vector-icons/fonts/MaterialIcons.ttf')
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={this.store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}
