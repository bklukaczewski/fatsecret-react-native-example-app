import React from 'react';
import {BackHandler} from 'react-native';

import {addNavigationHelpers, NavigationActions, StackNavigator} from 'react-navigation';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';

import {
  FoodDetailsScreen,
  FoodSearchScreen
} from '../screens';

export const MainStackNavigator = StackNavigator({
  FoodSearch: {
    screen: FoodSearchScreen,
    navigationOptions: {
      title: 'Food Search'
    }
  },
  FoodDetails: {
    screen: FoodDetailsScreen,
  }
});

createReactNavigationReduxMiddleware<Props>(
  'root',
  (state) => state.nav,
);

const addListener = createReduxBoundAddListener('root');

interface Props {
  dispatch: (action) => object;
  nav: any;
}

class AppWithNavigationState extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress() {
    const {dispatch, nav} = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  }

  render() {
    const {dispatch, nav} = this.props;
    return (
      <MainStackNavigator navigation={addNavigationHelpers({dispatch, state: nav, addListener})}/>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
