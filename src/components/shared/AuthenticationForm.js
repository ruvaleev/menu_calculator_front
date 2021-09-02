import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function AuthenticationForm({ onSubmit }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => {
        onSubmit({ email, password  });
      }} >
        <Text>{t('submit')}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AuthenticationForm;

AuthenticationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },
  input: {
    height: 24,
    paddingLeft: 32,
    marginTop: 12,
    width: 200,
    fontStyle: 'italic',
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    marginTop: 12,
    width: 200,
    borderColor: 'black',
    borderWidth: 1
  }
});
