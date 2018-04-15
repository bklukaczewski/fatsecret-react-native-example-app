import {StyleSheet} from 'react-native';

import palette from './palette';

const common = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: palette.background,
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default common;
