import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

import createStore from './redux/store';
import setupInterceptors from "./redux/shared/axios/setupInterceptors";

import Menu from './components/Menu';
import Receipts from './components/Receipts';
import Settings from './components/Settings';
import ShoppingList from './components/ShoppingList';
import SignIn from './components/SignIn';

const store = createStore();
setupInterceptors(store);

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
        <Stack.Navigator initialRouteName="Menu">
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Receipts" component={Receipts} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Shopping List" component={ShoppingList} />
          <Stack.Screen name="Sign In" component={SignIn} options={{ title: t('sign in') }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default registerRootComponent(App);
