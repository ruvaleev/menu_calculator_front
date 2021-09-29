import React from 'react';
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

import Settings from '../../../components/Settings';
import Store from '../../shared/Store';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <Settings navigation={navigation} />
    </Provider>
  );
}

describe('Settings', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  describe('when component is loading', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isLoading: true
        }),
      }));

      store.dispatch = jest.fn();
    });

    it('renders loading icon', (done) => {
      component = renderWithStoreAndNavigator(store, navigation);
      expect(component.getByTestId('LoadingIcon')).toBeTruthy();
      done();
    });
  });

  describe('when component is not loading', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isLoading: false
        }),
      }));

      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it("doesn't render loading icon", () => {
      expect(component.queryByTestId('LoadingIcon')).toBeFalsy();
    });

    it('correctly renders footer menu', () => {
      expect(component.getByTestId('FooterMenu')).toBeTruthy();
    });
  });
});
