import React from 'react';
import {View} from 'react-native';

import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/observable/fromPromise';

import {searchActions} from '../actions';
import {LoadingIndicator, SearchResults} from '../components';
import {searchFood} from '../fatsecret';
import {FatsecretResponse} from '../models';
import styles from '../styles';

const DEBOUNCE_TIME = 800;

interface Props {
  dispatch: (action) => object;
  isLoading: boolean;
}

class FoodSearchScreen extends React.Component<Props> {

  queries = new Subject<string>();

  constructor(props: Props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.queries
      .debounceTime(DEBOUNCE_TIME)
      .flatMap((query) => Observable.fromPromise(searchFood(query)))
      .subscribe((response: FatsecretResponse) =>
        this.props.dispatch(searchActions.setSearchResults(response.foods.food)),
        () => this.props.dispatch(searchActions.setSearchResults([])));
  }

  onChangeText(query: string) {
    this.props.dispatch(searchActions.setSearchQuery(query));
    if (!query || query.length <= 2) {
      this.queries.next('');
      return;
    }
    this.props.dispatch(searchActions.startLoading());
    this.queries.next(query);
  }

  render() {
    const {isLoading} = this.props;
    return (
      <View style={styles.common.view}>
        <SearchBar
          round
          onChangeText={this.onChangeText}
          placeholder="Type food name here..."
          lightTheme
        />
        <LoadingIndicator isLoading={isLoading}/>
        <SearchResults/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
  isLoading: state.search.isLoading,
});

export default connect(mapStateToProps)(FoodSearchScreen);
