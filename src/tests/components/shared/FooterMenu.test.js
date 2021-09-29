import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'

import configureStore from 'redux-mock-store';

import FooterMenu from '../../../components/shared/FooterMenu';
import Store from '../../shared/Store';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <FooterMenu navigation={navigation} />
  );
}

describe('FooterMenu', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(Store());
    store.dispatch = jest.fn();
    component = renderWithStoreAndNavigator(store, navigation);
  });

  it('correctly renders link to Shopping List', () => {
    fireEvent.press(component.getByTestId('Shopping List'));
    expect(navigate).toHaveBeenCalledWith('Shopping List');
  });

  it('correctly renders link to Receipts', () => {
    fireEvent.press(component.getByTestId('Receipts'));
    expect(navigate).toHaveBeenCalledWith('Receipts');
  });

  it('correctly renders link to Menu', () => {
    fireEvent.press(component.getByTestId('Menu'));
    expect(navigate).toHaveBeenCalledWith('Menu');
  });

  it('correctly renders link to Settings', () => {
    fireEvent.press(component.getByTestId('Settings'));
    expect(navigate).toHaveBeenCalledWith('Settings');
  });
});
