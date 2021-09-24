import GoogleAuthService from '../../services/GoogleAuthService';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

jest.mock('expo-auth-session/providers/google', () => ({
  ...(jest.requireActual('expo-auth-session/providers/google')),
  useAuthRequest: jest.fn().mockImplementation(() => ['request', 'response', 'promptAsync'])
}))

jest.mock('expo-web-browser', () => ({
  ...(jest.requireActual('expo-web-browser')),
  maybeCompleteAuthSession: jest.fn()
}))

describe('GoogleAuthService', () => {
  describe('authorize', () => {
    it('calls useAuthRequest hook', () => {
      GoogleAuthService.authorize()
      expect(Google.useAuthRequest).toHaveBeenCalledTimes(1);
    })

    it('calls :maybeCompleteAuthSession method on WebBrowser', () => {
      GoogleAuthService.authorize()
      expect(WebBrowser.maybeCompleteAuthSession).toHaveBeenCalledTimes(2);
    })

    it('returns Google request, response and promptAsync objects', () => {
      const expectedResponse = { request: 'request', response: 'response', promptAsync: 'promptAsync' }
      expect(GoogleAuthService.authorize()).toEqual(expectedResponse); 
    })
  })
})
