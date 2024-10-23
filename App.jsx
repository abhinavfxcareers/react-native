import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Idiyappam, MilkCake, Rasam, Dosa, SearchStocks } from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="milkcake">
        <Stack.Screen name="milkcake" component={MilkCake} />
        <Stack.Screen name="rasam" component={Rasam} />
        <Stack.Screen name="idiyappam" component={Idiyappam} />
        <Stack.Screen name = "dosa" component = {Dosa} />
        <Stack.Screen name = "searchStocks" component={SearchStocks}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

