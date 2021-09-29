import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import FooterMenu from '../shared/FooterMenu';
import withLoading from '../HOC/withLoading';


function Receipts({ navigation }) {
  return (
    <View style={styles.container}>
      <FooterMenu navigation={navigation}/>
    </View>
  );
}

export default withLoading(Receipts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Receipts.propTypes = {
  navigation: PropTypes.object.isRequired
};

Receipts.defaultProps = {
  error: null,
};
