import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import {List, ListItem} from 'react-native-elements';

import {FatsecretFood} from '../models';

interface Props {
  results: FatsecretFood[];
  isLoading: boolean;
}

class SearchResults extends React.Component<Props> {

  onFoodPress(food: FatsecretFood) {
    requestAnimationFrame(() => {});
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
        <List>
          {results.map((result, index) => <ListItem
            key={index}
            title={result.food_name}
            subtitle={result.food_description}
            onPress={() => this.onFoodPress(result)}
          />)}
        </List>
      </ScrollView>
    );
  }
}

export default SearchResults;
