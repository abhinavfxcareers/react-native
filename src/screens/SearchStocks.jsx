import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SearchStocks = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchStock = () => {
    if (stockSymbol === '') {
      setError('Please enter a stock symbol.');
      return;
    }

    setLoading(true);
    setError(null);

    axios({
      method: 'GET',
      url: `https://real-time-finance-data.p.rapidapi.com/search?query=${stockSymbol}&language=en`,
      headers: {
        'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com',
        'x-rapidapi-key': '9f62ed7842msh20390c64db2298dp1dbbf5jsn945b8e42b7ef',
      },
    })
      .then((response) => {
        setStockData(response.data.data.stock || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch stock data.');
        setLoading(false);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Search for Stock Details</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={stockSymbol}
        onChangeText={(text) => setStockSymbol(text)}
      />
      
      <Button title="Search" onPress={searchStock} />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {stockData && stockData.length > 0 && (
        <View style={styles.results}>
          {stockData.map((stock, index) => (
            <View key={index} style={styles.stockCard}>
              <Text style={styles.stockName}>{stock.name}</Text>
              <Text style={styles.stockSymbol}>Symbol: {stock.symbol}</Text>
              <Text>Price: ${stock.price}</Text>
              <Text>Change: {stock.change} ({stock.change_percent}%)</Text>
              <Text>Previous Close: ${stock.previous_close}</Text>
              <Text>Exchange: {stock.exchange}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
  },
  stockCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stockSymbol: {
    color: '#555',
    marginBottom: 5,
  },
});

export default SearchStocks;
