import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import ButtonLink from '../shared/ButtonLink';
import Errors from '../shared/Errors';
import FooterMenu from '../shared/FooterMenu';
import ToggleLocaleButton from '../shared/ToggleLocaleButton';
import withLoading from '../HOC/withLoading';

import { Button } from 'react-native';

import GoogleAuthService from '../../services/GoogleAuthService';

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

function Menu({
  error, isAuthenticated, isError, logOut, navigation, resetError, signInOmniauth
}) {

  const { t } = useTranslation();
  const { request, promptAsync } = GoogleAuthService.authorize();

  return (
    <View style={styles.container}>
      
      <Button
        disabled={!request}
        title={t('sign in with google')}
        onPress={() => {
          promptAsync().then((res) => {
            if (!res.authentication) return;
            
            const omniauth = {
              access_token: res.authentication.accessToken,
              provider: 'google'
            }
            signInOmniauth(omniauth)
          });
        }}
      />
      <AuthenticationMenu isAuthenticated={isAuthenticated} logOut={logOut} navigation={navigation} />
      <ToggleLocaleButton />
      <Errors isError={isError} error={error} callback={() => resetError()} />
      <FooterMenu navigation={navigation}/>
    </View>
  );
}

export default withLoading(Menu);

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

Menu.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  signInOmniauth: PropTypes.func.isRequired
};

Menu.defaultProps = {
  error: null,
};
