import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Market" component={MarketScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})