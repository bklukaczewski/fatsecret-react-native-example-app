import React from 'react';
import {View} from 'react-native';

import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';

import {searchActions} from '../actions';
import {LoadingIndicator, SearchResults} from '../components';
import {searchFood} from '../fatsecret';
import {FatsecretFood, FatsecretResponse} from '../models';
import styles from '../styles';

const SEARCH_INTERVAL = 800;

interface Props {
  dispatch: (action) => object;
  isLoading: boolean;
  results: FatsecretFood[];
}

class FoodSearchScreen extends React.Component<Props> {

  searchTimeout: number;

  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(query: string) {
    this.props.dispatch(searchActions.setSearchQuery(query));
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    if (!query || query.length <= 2) {
      this.searchTimeout = window.setTimeout(() => {
        this.props.dispatch(searchActions.setSearchResults([]));
        this.props.dispatch(searchActions.finishLoading());
      }, SEARCH_INTERVAL);
      return;
    }
    this.props.dispatch(searchActions.startLoading());
    this.searchTimeout = window.setTimeout(() => {
      searchFood(query)
        .then((response: FatsecretResponse) => {
          this.props.dispatch(searchActions.setSearchResults(response.foods.food));
        })
        .catch(() => this.props.dispatch(searchActions.setSearchResults(null)))
        .finally(() => this.props.dispatch(searchActions.finishLoading()));
    }, SEARCH_INTERVAL);
  }

  render() {
    const {isLoading, results} = this.props;
    return (
      <View style={styles.common.view}>
        <SearchBar
          round
          onChangeText={this.onChangeText}
          placeholder="Type food name here..."
          lightTheme
        />
        <LoadingIndicator isLoading={isLoading}/>
        <SearchResults
          results={results}
          isLoading={isLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  isLoading: state.search.isLoading,
  results: state.search.results,
});

export default connect(mapStateToProps)(FoodSearchScreen);
