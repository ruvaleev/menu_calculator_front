import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

function ServiceGoogleAuthService() {
  this.authorize = function() {
    WebBrowser.maybeCompleteAuthSession();

    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: '803978286301-dquirjepl3qjhrvfo5kspa778v3l9kp9.apps.googleusercontent.com',
      iosClientId: '803978286301-dquirjepl3qjhrvfo5kspa778v3l9kp9.apps.googleusercontent.com',
      androidClientId: '803978286301-6f5ekqgvvtmr2nmrb7urs4rf90fqves3.apps.googleusercontent.com',
      webClientId: '803978286301-dquirjepl3qjhrvfo5kspa778v3l9kp9.apps.googleusercontent.com',
    });

    return { request, response, promptAsync }
  }
}

const GoogleAuthService = new ServiceGoogleAuthService();

export default GoogleAuthService;
