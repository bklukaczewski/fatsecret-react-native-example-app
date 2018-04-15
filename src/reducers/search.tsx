import {SearchActions} from '../actions';
import {FatsecretFood} from '../models';

export interface SearchState {
  isLoading: boolean;
  query: string;
  results: FatsecretFood[];
}

export const initialState: SearchState = {
  isLoading: false,
  query: '',
  results: null,
};

export function search(state = initialState, action): SearchState {
  switch (action.type) {
    case SearchActions.SetSearchQuery:
      return {...state, query: action.payload};
    case SearchActions.SetSearchResults:
      if (!action.payload) {
        return {...state, results: null};
      }
      const results = Array.isArray(action.payload) ? action.payload : [action.payload];
      return {...state, results};
    case SearchActions.StartLoading:
      return {...state, isLoading: true};
    case SearchActions.FinishLoading:
      return {...state, isLoading: false};
    default:
      return state;
  }
}
