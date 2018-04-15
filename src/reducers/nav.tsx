import {NavigationActions, NavigationState} from 'react-navigation';

import {MainStackNavigator} from '../navigators/MainStackNavigator';

const initialNavState: NavigationState = null;

export function nav(state = initialNavState, action): NavigationState {
  let nextState;
  switch (action.type) {
    default:
      nextState = MainStackNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
