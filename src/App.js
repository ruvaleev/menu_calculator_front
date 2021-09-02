import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import createStore from './redux/store';
import SignIn from './components/SignIn';
import Home from './components/Home';

const store = createStore();
const Stack = createStackNavigator();

function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <AppComponent/>
    </Suspense>
  );
}

function AppComponent() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Sign In" component={SignIn} options={{ title: t('sign in') }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
