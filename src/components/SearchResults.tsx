import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {List, ListItem} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

import {FatsecretFood} from '../models';

interface Props {
  dispatch: (action) => object;
  results: FatsecretFood[];
  isLoading: boolean;
}

class SearchResults extends React.Component<Props> {

  onFoodPress(food: FatsecretFood) {
    requestAnimationFrame(() => {
      this.props.dispatch(NavigationActions.navigate({routeName: 'FoodDetails', params: {food}}));
    });
  }

  render() {
    const {results, isLoading} = this.props;
    if (!results) {
      return (<View/>);
    }
    if (!results.length && !isLoading) {
      return (<Text style={{textAlign: 'center'}}>Nothing found. Try different search text.</Text>);
    }
    return (
      <ScrollView>
        {results.length && <List>
          {results.map((result, index) => <ListItem
            key={index}
            title={result.food_name}
            subtitle={result.food_description}
            onPress={() => this.onFoodPress(result)}
          />)}
        </List>}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  results: state.search.results,
  isLoading: state.search.isLoading,
});

export default connect(mapStateToProps)(SearchResults);
