import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './LoginScreen';
import MainPage from './mainPage';
import CartPage from './cartPage';
import { ItemsProvider } from './itemsContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }} />
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="Cart" component={CartPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}