import {StyleSheet} from 'react-native';

import palette from './palette';

const common = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: palette.background,
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    color: palette.text,
  },
  subheader: {
    fontSize: 16,
    color: palette.textMuted,
    marginBottom: 8,
  }
});

export default common;
