import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function ButtonLink({ callback, title }) {
  return (
    <TouchableOpacity onPress={callback} style={styles.button}>
      <Text style={styles.text} >{title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonLink;

ButtonLink.propTypes = {
  callback: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {
  classNames: 'title cursor-pointer',
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#D83E1D',
    fontSize: 24,
    marginVertical: 4
  },
});
