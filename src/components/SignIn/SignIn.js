import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import withLoading from '../HOC/withLoading';
import AuthenticationForm from '../shared/AuthenticationForm';
import Errors from '../shared/Errors';

function SignIn({ error, isAuthenticated, isError, navigation, resetError, signIn }) {
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.form}>
      <AuthenticationForm onSubmit={signIn} />
      <Errors isError={isError} error={error} callback={() => resetError()} />
    </View>
  )
}

export default withLoading(SignIn);

SignIn.propTypes = {
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
});
