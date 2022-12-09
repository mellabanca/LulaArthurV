import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import MeteorScreen from './screens/Meteor';
import IssLocationScreen from './screens/IssLocation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Casa"
                       screenOptions={{headerShown: false}}>
        <Stack.Screen name="Casa" component={HomeScreen}/>
        <Stack.Screen name="UbicaciónDeLaNasa" component={IssLocationScreen}/>
        <Stack.Screen name="Meteorito" component={MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
