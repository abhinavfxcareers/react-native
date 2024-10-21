import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Rasam = () => {
  const [cakeReady, setCakeReady] = useState(false);

  const createCake = () => {
    setCakeReady(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rasam</Text>
      <Image
        source={{ uri: 'https://i.ytimg.com/vi/315Ftf-kPgs/maxresdefault.jpg' }} // Replace with a valid image URL
        style={styles.image}
      />
      <Text style={styles.description}>
        Rasam is a tangy and flavorful South Indian soup made with tamarind juice, tomatoes, and a variety of spices. It's often served as a starter or mixed with rice. Known for its aromatic flavors, it's both refreshing and comforting.
      </Text>
      {!cakeReady ? (
        <TouchableOpacity style={styles.button} onPress={createCake}>
          <Text style={styles.buttonText}>Cook Rasam</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.readyText}>🎉 Your Rasam is ready! Enjoy! 🎉</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 16,
    borderRadius: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#ff7043',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  readyText: {
    fontSize: 18,
    color: '#388e3c',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Rasam;