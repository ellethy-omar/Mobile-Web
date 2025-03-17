import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './mainPage';
import CartPage from './cartPage';
import { ItemsProvider } from './itemsContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainPage">
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Cart" component={CartPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}