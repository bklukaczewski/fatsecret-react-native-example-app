import React from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';

import {LoadingIndicator} from '../components';
import {getFood} from '../fatsecret';
import {FatsecretFood, FatsecretServing} from '../models';
import styles from '../styles';

interface Props {
  dispatch: (action) => object;
  navigation?: {
    state: {
      params: {
        food: FatsecretFood;
      }
    }
  };
}

interface State {
  food: FatsecretFood;
}

class FoodDetailsScreen extends React.Component<Props, State> {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.food.food_name,
  })

  constructor(props: Props) {
    super(props);
    this.state = {
      food: null,
    };
  }

  componentDidMount() {
    getFood(this.props.navigation.state.params.food.food_id)
      .then((response) => this.setState({food: response.food}));
  }

  _renderDetails() {
    const {food} = this.state;
    if (!food) {
      return (
        <LoadingIndicator isLoading/>
      );
    }
    const serving = food.servings.serving[0] || food.servings.serving as FatsecretServing;
    return (
      <View>
        <Text style={styles.common.subheader}>
          Per {serving.measurement_description} ({serving.metric_serving_amount} {serving.metric_serving_unit})
        </Text>
        <View style={styles.common.rowSpaced}>
          <Text>calories:</Text>
          <Text>{serving.calories} kcal</Text>
        </View>
        <View style={styles.common.rowSpaced}>
          <Text>fats:</Text>
          <Text>{serving.fat} g</Text>
        </View>
        <View style={styles.common.rowSpaced}>
          <Text>proteins:</Text>
          <Text>{serving.protein} g</Text>
        </View>
        <View style={styles.common.rowSpaced}>
          <Text>carbohydrates:</Text>
          <Text>{serving.carbohydrate} g</Text>
        </View>
      </View>
    );
  }

  render() {
    const {food} = this.state;
    if (!food) {
      return (
        <LoadingIndicator isLoading/>
      );
    }
    return (
      <View style={[styles.common.view, {paddingHorizontal: 24, paddingVertical: 12}]}>
        <Text style={styles.common.header}>{food.food_name}</Text>
        {this._renderDetails()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(FoodDetailsScreen);
