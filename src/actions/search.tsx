import {FatsecretFood} from '../models';

export enum SearchActions {
  SetSearchQuery = 'Search Query Set',
  SetSearchResults = 'Search Results Set',
  StartLoading = 'Search Loading Start',
  FinishLoading = 'Search Loading Finish',
}

export const searchActions = {
  setSearchQuery: (payload: string) => ({
    type: SearchActions.SetSearchQuery, payload
  }),
  setSearchResults: (payload: FatsecretFood[]) => ({
    type: SearchActions.SetSearchResults, payload
  }),
  startLoading: () => ({
    type: SearchActions.StartLoading
  }),
  finishLoading: () => ({
    type: SearchActions.FinishLoading
  })
};
