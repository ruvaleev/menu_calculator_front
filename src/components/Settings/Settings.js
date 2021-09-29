import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import FooterMenu from '../shared/FooterMenu';
import withLoading from '../HOC/withLoading';


function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <FooterMenu navigation={navigation}/>
    </View>
  );
}

export default withLoading(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired
};

Settings.defaultProps = {
  error: null,
};
