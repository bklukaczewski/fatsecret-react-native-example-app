import React from 'react';
import {Text} from 'react-native';

import {connect} from 'react-redux';

interface Props {
  dispatch: (action) => object;
}

class FoodSearchScreen extends React.Component<Props> {

  render() {
    return (
      <Text>Food Search</Text>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(FoodSearchScreen);
