import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MilkCake, Rasam } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="milkcake">
        <Stack.Screen name="milkcake" component={MilkCake} />
        <Stack.Screen name="rasam" component={Rasam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;