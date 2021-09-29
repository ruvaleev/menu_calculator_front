import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import i18n from 'i18next';

import Menu from '../../../components/Menu';
import Store from '../../shared/Store';
import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import AuthenticationsReducerGenerator from '../../shared/AuthenticationsReducerGenerator';

import GoogleAuthService from '../../../services/GoogleAuthService';

function renderWithStoreAndNavigator(store, navigation) {
  return render(
    <Provider store={store}>
      <Menu navigation={navigation} />
    </Provider>
  );
}

describe('Menu', () => {
  const mockStore = configureStore([]);
  const navigate = jest.fn();
  const navigation = { navigate: navigate };
  let store;
  let component;

  describe('when user authenticated', () => {
    beforeEach(() => {
      store = mockStore(Store({
        authenticationsReducer: AuthenticationsReducerGenerator({
          isAuthenticated: true,
        }),
      }));

      store.dispatch = jest.fn();

      GoogleAuthService.authorize = jest.fn().mockImplementation;
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('correctly renders footer menu', () => {
      expect(component.getByTestId('FooterMenu')).toBeTruthy();
    });

    it('dispatches logOut action on log out link click', () => {
      authenticationsSliceActions.logOut = jest.fn();

      fireEvent.press(component.getByText(i18n.t('log out')));

      expect(authenticationsSliceActions.logOut).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("doesn't render sign in link", () => {
      expect(component.queryByText(i18n.t('sign in'))).toBeFalsy();
    });

    it('renders change language link', () => {
      const changeLanguageLink = component.getByText(i18n.t('change language'));
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

  describe('when user unauthenticated', () => {
    beforeEach(() => {
      store = mockStore(Store());
      store.dispatch = jest.fn();
      component = renderWithStoreAndNavigator(store, navigation);
    });

    it('correctly renders link to sign in page', () => {
      fireEvent.press(component.getByText(i18n.t('sign in')));
      expect(navigate).toHaveBeenCalledWith('Sign In');
    });

    it("doesn't render log out link", () => {
      expect(component.queryByText(i18n.t('log out'))).toBeFalsy();
    });

    it('renders change language link', () => {
      const changeLanguageLink = component.getByText(i18n.t('change language'));
      fireEvent.press(changeLanguageLink);
      const initialLanguage = i18n.language;

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).not.toEqual(initialLanguage);

      fireEvent.press(changeLanguageLink);
      expect(i18n.language).toEqual(initialLanguage);
    });
  });

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
  });

  describe('when there are errors in store', () => {
    const errorMessage = 'Some Error Message';

    beforeEach(() => {
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

    it('dispatches resetError action on click on background', () => {
      authenticationsSliceActions.resetError = jest.fn().mockImplementation();

      const background = component.getByTestId('errorBackground');

      fireEvent.press(background);

      expect(authenticationsSliceActions.resetError).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
