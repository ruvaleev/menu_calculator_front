
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as authenticationsSliceActions from '../../../redux/slices/authentications';
import createStore from '../../../redux/store';

describe('authenticationsReducer', () => {
  const accessToken = 'd6cedbcf70a5eaa2004a309ee05757a7a717f68642a1349dfd34f9777866b6c8'
  let store;

  beforeEach(() => {
    store = createStore();
  });

  describe('signIn', () => {
    beforeEach(async () => {
      await AsyncStorage.removeItem('AccessToken');
    });

    describe('when credentials are correct', () => {
      const validCredentialsAction = { email: 'correct@email.com', password: 'password' };

      beforeEach(async () => {
        await store.dispatch(authenticationsSliceActions.signIn(validCredentialsAction));
      });

      it('sets isAuthenticated flag to true', async () => {
        expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(true);
        expect(store.getState().authenticationsReducer.isError).toEqual(false);
        expect(store.getState().authenticationsReducer.error).toEqual(null);
        expect(await AsyncStorage.getItem('AccessToken')).toEqual(accessToken)
      });
    });

    describe('when credentials are incorrect', () => {
      const invalidCredentialsAction = { email: 'incorrect@email.com', password: 'password' };
      const errorCode = 'unauthorized';

      beforeEach(async () => {
        await store.dispatch(authenticationsSliceActions.signIn(invalidCredentialsAction));
      });

      it('sets isError flag to true and fills error', async () => {
        expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
        expect(store.getState().authenticationsReducer.isError).toEqual(true);
        expect(store.getState().authenticationsReducer.error).toEqual(errorCode);
        expect(await AsyncStorage.getItem('AccessToken')).toEqual(null)
      });
    });
  });

  describe('logOut', () => {
    beforeEach(async () => {
      store = createStore({ authenticationsReducer: { isAuthenticated: true } });
      await AsyncStorage.setItem('AccessToken', accessToken);
      await store.dispatch(authenticationsSliceActions.logOut());
    });

    it('sets isAuthenticated flag to false and nullifies AccessToken', async () => {
      expect(store.getState().authenticationsReducer.isAuthenticated).toEqual(false);
      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
      expect(await AsyncStorage.getItem('AccessToken')).toEqual(null)
    })
  });

  describe('resetError', () => {
    const errorCode = 'some error message';
    beforeEach(() => {
      store = createStore({ authenticationsReducer: { isError: true, error: errorCode } });
    });
    it('set isAuthenticated flag to false and nullifies authToken', async () => {
      expect(store.getState().authenticationsReducer.isError).toEqual(true);
      expect(store.getState().authenticationsReducer.error).toEqual(errorCode);

      store.dispatch(authenticationsSliceActions.resetError());

      expect(store.getState().authenticationsReducer.isError).toEqual(false);
      expect(store.getState().authenticationsReducer.error).toEqual(null);
    });
  });
});
