import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import ButtonLink from '../shared/ButtonLink';

function FooterMenu({ navigation }) {
  return (
    <View testID='FooterMenu'>
      <ButtonLink callback={() => navigation.navigate('Shopping List')} title='Shopping List' testID='Shopping List' />
      <ButtonLink callback={() => navigation.navigate('Receipts')} title='Receipts' testID='Receipts' />
      <ButtonLink callback={() => navigation.navigate('Menu')} title='Menu' testID='Menu' />
      <ButtonLink callback={() => navigation.navigate('Settings')} title='Settings' testID='Settings' />
    </View>
  );
}

export default FooterMenu;

FooterMenu.propTypes = {
  navigation: PropTypes.object.isRequired
};
