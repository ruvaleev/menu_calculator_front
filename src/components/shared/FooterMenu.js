import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import ButtonLink from '../shared/ButtonLink';

function FooterMenu({ navigation }) {
  return (
    <View testID='FooterMenu' style={styles.container}>
      <ButtonLink callback={() => navigation.navigate('Shopping List')} title='Shopping List' testID='Shopping List' />
      <ButtonLink callback={() => navigation.navigate('Receipts')} title='Receipts' testID='Receipts' />
      <ButtonLink callback={() => navigation.navigate('Menu')} title='Menu' testID='Menu' />
      <ButtonLink callback={() => navigation.navigate('Settings')} title='Settings' testID='Settings' />
    </View>
  );
}

export default FooterMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
});

FooterMenu.propTypes = {
  navigation: PropTypes.object.isRequired
};
