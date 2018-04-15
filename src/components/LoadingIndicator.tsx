import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import styles from '../styles';

interface Props {
  isLoading: boolean;
}

class LoadingIndicator extends React.Component<Props> {
  render() {
    if (!this.props.isLoading) {
      return (<View/>);
    }
    return (
      <View style={[styles.common.rowCentered, {paddingVertical: 12}]}>
        <ActivityIndicator
          size="large"
          color={styles.palette.primary}
        />
        <Text style={{marginLeft: 24, color: styles.palette.primary}}>Searching...</Text>
      </View>
    );
  }
}

export default LoadingIndicator;
