import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Idiyappam, MilkCake, Rasam, Dosa, SearchStocks, StockNews, WebViewScreen} from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="milkcake">
        <Stack.Screen name="milkcake" component={MilkCake} />
        <Stack.Screen name="rasam" component={Rasam} />
        <Stack.Screen name="idiyappam" component={Idiyappam} />
        <Stack.Screen name = "dosa" component = {Dosa} />
        <Stack.Screen name = "Search Stocks" component={SearchStocks}/>
        <Stack.Screen name = "Stock News" component={StockNews}/>
        <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

