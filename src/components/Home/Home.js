import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import withLoading from '../HOC/withLoading';
import ButtonLink from '../shared/ButtonLink';
import Errors from '../shared/Errors';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';

function AuthenticationMenu({ isAuthenticated, logOut, navigation }) {
  const { t } = useTranslation();

  return (
    isAuthenticated
      ? (
        <>
          <ButtonLink callback={() => logOut()} title={t('log out')} />
        </>
      )
      : (
        <>
          <ButtonLink callback={() => navigation.navigate('Sign In')} title={t('sign in')} />
        </>
      )
  );
}

function Home({
  error, isAuthenticated, isError, logOut, navigation, resetError
}) {

  return (
    <View style={styles.container}>
      <AuthenticationMenu isAuthenticated={isAuthenticated} logOut={logOut} navigation={navigation} />
      <ToggleLocaleButton />
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </View>
  );
}

export default withLoading(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AuthenticationMenu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

Home.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired
};

Home.defaultProps = {
  error: null,
};
