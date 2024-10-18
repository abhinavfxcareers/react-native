import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const MilkCake = () => {
  const [cakeReady, setCakeReady] = useState(false);

  const createCake = () => {
    setCakeReady(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RASSAM</Text>
      <Image
        source={{ uri: 'https://www.munipendawala.com/cdn/shop/files/Milk-Cake_ef138ba2-cc25-4f28-9b55-ed66773cc000.jpg?v=1683115440&width=1100' }} // Replace with a valid image URL
        style={styles.image}
      />
      <Text style={styles.description}>
        Milk Cake is a classic Indian dessert made with condensed milk, sugar, and cardamom. It has a soft texture and a delicious flavor.
      </Text>
      {!cakeReady ? (
        <Button title="Create Milk Cake" onPress={createCake} />
      ) : (
        <Text style={styles.readyText}>🎉 Your Milk Cake is ready! Enjoy! 🎉</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fce4ec',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d32f2f',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  readyText: {
    fontSize: 20,
    color: '#388e3c',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default MilkCake;
