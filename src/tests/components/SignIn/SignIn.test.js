import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import i18n from 'i18next';
import { fireEvent, render } from '@testing-library/react-native'

import SignIn from '../../../components/SignIn';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <SignIn navigation={navigation}/>
    </Provider>,
  );
}
describe('SignIn', () => {
  const mockStore = configureStore([]);
  let store;
  let component;
  let errorMessage;
  const correctEmail = 'correct@email.com';
  const password = 'password';
  const navigate = jest.fn();
  const navigation = { navigate: navigate };

  describe('when no errors in store', () => {
    beforeEach(() => {
      store = mockStore(Store({}));
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('dispatches signIn action on signIn form submit', () => {
      authenticationsSliceActions.signIn = jest.fn().mockImplementation((payload) => payload);

      const emailInput = component.getByPlaceholderText(i18n.t('email'));
      const passwordInput = component.getByPlaceholderText(i18n.t('password'));
      let submitButton = component.getByText(i18n.t('submit'));

      fireEvent.changeText(emailInput, correctEmail);
      fireEvent.changeText(passwordInput, password);
      fireEvent.press(submitButton);

      const expectedPayload = { email: correctEmail, password };

      expect(authenticationsSliceActions.signIn).toHaveBeenCalledTimes(1);
      expect(authenticationsSliceActions.signIn).toHaveBeenCalledWith(expectedPayload);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(expectedPayload);
    });

    describe('when there are errors in store', () => {
      beforeEach(() => {
        errorMessage = 'Some Error Message';
        store = mockStore(Store({
          authenticationsReducer: AuthenticationsReducerGenerator({
            isError: true,
            error: errorMessage,
          }),
        }));
  
        store.dispatch = jest.fn();
        component = renderWithStoreAndNavigator(store, navigation);
      });
  
      it('shows proper error message', () => {
        expect(component.queryByText(errorMessage)).toBeTruthy();
      });
  
      it('dispatches resetError action on click on error message', () => {
        authenticationsSliceActions.resetError = jest.fn().mockImplementation();
  
        const errorMessageDiv = component.getByText(errorMessage);
  
        fireEvent.press(errorMessageDiv);
  
        expect(authenticationsSliceActions.resetError).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('when user is authenticated already', () => {
      beforeEach(() => {
        store = mockStore(Store({
          authenticationsReducer: AuthenticationsReducerGenerator({
            isAuthenticated: true
          }),
        }));
        store.dispatch = jest.fn();
        authenticationsSliceActions.setError = jest.fn();
        component = renderWithStoreAndNavigator(store, navigation);
      });
  
      it('redirects to Home page', () => {
        expect(navigate).toHaveBeenCalledWith('Home');
      });
    });
  });
})
