import React from 'react';
import { Text } from 'react-native';

// Imports related to navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MilkCake, Rassam } from './src/screens';

// Initialize the Stack navigator
const Stack = createNativeStackNavigator();

// Refactor as an arrow function component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="milkcake">
        {/* Add your screens here */}
        <Stack.Screen name="milkcake" component={MilkCake} />
        <Stack.Screen name="rassam" component={Rassam} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
